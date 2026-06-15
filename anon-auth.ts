// =============================================================
// AURA UNAM — Edge Function: anon-auth
// Registro y verificación de "cuentas anónimas" con código + password.
// Captura IP hasheada para detección de abuso.
//
// Endpoints (vía body.action):
//   - register: crea student_profile con anonymous_code + password (opcional)
//   - login:    valida password de un código existente
//   - history:  retorna histórico de sesiones/check-ins de un código (validado por password)
// =============================================================

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL  = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY   = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const HASH_SALT     = Deno.env.get("HASH_SALT") || "aura-default-change-me";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

const supa = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

// Hash SHA-256 con salt para password (simple, sin bcrypt)
async function pwHash(password: string) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${HASH_SALT}::${password}`)
  );
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

async function ipHash(ip: string) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${HASH_SALT}::ip::${ip}`)
  );
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function ipPrefix(ip: string) {
  if (!ip) return null;
  if (ip.includes(":")) {
    return ip.split(":").slice(0, 4).join(":"); // primeros 4 grupos de IPv6
  }
  const parts = ip.split(".");
  return parts.length >= 2 ? `${parts[0]}.${parts[1]}.x.x` : null;
}

async function getClientIP(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "0.0.0.0";
}

async function isBlocked(hash: string) {
  const { data } = await supa.from("ip_blocklist").select("ip_hash").eq("ip_hash", hash).maybeSingle();
  return !!data;
}

async function logIP(hash: string, prefix: string | null, endpoint: string, code?: string) {
  try {
    await supa.from("ip_log").insert({ ip_hash: hash, ip_prefix: prefix, endpoint, anonymous_code: code || null });
  } catch (e) { /* ignore */ }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  // Try/catch global: nunca devolvemos 5xx silencioso. Siempre JSON con detalle.
  try {
    let body: any;
    try { body = await req.json(); } catch { return json({ error: "JSON inválido" }, 400); }

    const action = String(body.action || "");

    // Endpoint de diagnóstico rápido (no toca tablas, sólo confirma que la fn corre)
    if (action === "ping") {
      return json({
        ok: true,
        pong: true,
        has_url: !!SUPABASE_URL,
        has_service: !!SERVICE_KEY,
        has_salt: HASH_SALT !== "aura-default-change-me",
      });
    }

    const ip   = await getClientIP(req);
    const hash = await ipHash(ip);
    const pref = ipPrefix(ip);

    // isBlocked tolerante a fallas de la tabla (no bloquea el registro si la tabla no existe)
    try { if (await isBlocked(hash)) return json({ error: "IP bloqueada por uso indebido" }, 429); }
    catch (e) { console.warn("[anon-auth] ip_blocklist check failed (continuing):", String((e as any)?.message || e)); }

  // ===========================================================
  // REGISTER: crea cuenta anónima
  // ===========================================================
  if (action === "register") {
    const code = String(body.anonymous_code || "").toUpperCase().trim();
    const password = String(body.password || "");
    const faculty = body.faculty ? String(body.faculty).slice(0, 80) : null;
    const career  = body.career  ? String(body.career).slice(0, 80)  : null;
    const semester = Number(body.semester) || null;

    if (!/^SIN-[A-Z]{3}-\d{4}$/.test(code)) {
      return json({ error: "Código con formato inválido", code_received: code }, 400);
    }

    // Verificar abuso (tolerante: si la tabla ip_log no existe o falla, NO bloqueamos el registro)
    try {
      const { count, error: countErr } = await supa
        .from("ip_log")
        .select("*", { count: "exact", head: true })
        .eq("ip_hash", hash)
        .eq("endpoint", "register")
        .gte("created_at", new Date(Date.now() - 24*3600*1000).toISOString());
      if (countErr) {
        console.warn("[anon-auth] ip_log count err (continuing):", countErr.message);
      } else if ((count ?? 0) > 5) {
        await supa.from("ip_blocklist").upsert({ ip_hash: hash, reason: "auto: >5 registros en 24h" })
          .then(() => {}, () => {});
        return json({ error: "Demasiados registros desde esta conexión. Inténtalo más tarde." }, 429);
      }
    } catch (e) {
      console.warn("[anon-auth] ip_log count threw (continuing):", String((e as any)?.message || e));
    }

    const password_hash = password ? await pwHash(password) : null;

    const { error } = await supa.from("student_profiles").upsert({
      anonymous_code: code,
      password_hash,
      faculty,
      career,
      semester,
      last_seen: new Date().toISOString(),
    }, { onConflict: "anonymous_code" });

    if (error) {
      console.error("[anon-auth] upsert student_profiles failed:", error);
      await logIP(hash, pref, "register_failed", code);
      // Devuelve detalles concretos para diagnóstico
      return json({
        error: "No se pudo crear la cuenta anónima",
        detail: error.message,
        hint: error.hint || null,
        code: error.code || null,
      }, 500);
    }

    await logIP(hash, pref, "register", code);
    return json({ ok: true, anonymous_code: code });
  }

  // ===========================================================
  // LOGIN: valida password
  // ===========================================================
  if (action === "login") {
    const code = String(body.anonymous_code || "").toUpperCase().trim();
    const password = String(body.password || "");

    if (!/^SIN-[A-Z]{3}-\d{4}$/.test(code)) {
      return json({ error: "Código con formato inválido." }, 400);
    }

    // Rate limit: max 10 intentos fallidos por IP en 1h
    const sinceHour = new Date(Date.now() - 3600*1000).toISOString();
    const { count: failed } = await supa.from("ip_log")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", hash)
      .in("endpoint", ["login_failed","login_unknown"])
      .gte("created_at", sinceHour);
    if ((failed ?? 0) >= 10) {
      return json({ error: "Demasiados intentos. Espera 1 hora antes de volver a intentar." }, 429);
    }

    const { data: profile } = await supa
      .from("student_profiles")
      .select("password_hash, faculty, career, semester")
      .eq("anonymous_code", code)
      .maybeSingle();

    if (!profile) {
      await logIP(hash, pref, "login_unknown", code);
      // Mensaje genérico para no filtrar si el código existe o no
      return json({ error: "Código o contraseña incorrectos." }, 401);
    }

    if (profile.password_hash) {
      const candidate = await pwHash(password);
      if (candidate !== profile.password_hash) {
        await logIP(hash, pref, "login_failed", code);
        // Mismo mensaje que código no encontrado (no filtra existencia)
        return json({ error: "Código o contraseña incorrectos." }, 401);
      }
    }

    await supa.from("student_profiles")
      .update({ last_seen: new Date().toISOString() })
      .eq("anonymous_code", code);

    await logIP(hash, pref, "login", code);
    return json({
      ok: true,
      anonymous_code: code,
      faculty: profile.faculty,
      career: profile.career,
      semester: profile.semester,
      has_password: Boolean(profile.password_hash),
    });
  }

  // ===========================================================
  // HISTORY: regresa sesiones + check-ins del código (post-login)
  // ===========================================================
  if (action === "history") {
    const code = String(body.anonymous_code || "").toUpperCase().trim();
    const password = String(body.password || "");

    const { data: profile } = await supa
      .from("student_profiles").select("password_hash").eq("anonymous_code", code).maybeSingle();
    if (!profile) return json({ error: "Código no encontrado" }, 404);
    if (profile.password_hash) {
      const candidate = await pwHash(password);
      if (candidate !== profile.password_hash) {
        return json({ error: "Contraseña incorrecta" }, 401);
      }
    }

    const [sessions, checkins, journal, achievements] = await Promise.all([
      supa.from("assessment_sessions")
        .select("id, total_score, general_level, dimension_scores, top_attention_areas, created_at")
        .eq("anonymous_code", code)
        .order("created_at", { ascending: false })
        .limit(20),
      supa.from("weekly_checkins")
        .select("mood, energy, stress, social, free_text, week_iso, created_at")
        .eq("anonymous_code", code)
        .order("created_at", { ascending: false })
        .limit(50),
      supa.from("student_journal")
        .select("entry, emotion_tag, created_at")
        .eq("anonymous_code", code)
        .order("created_at", { ascending: false })
        .limit(30),
      supa.from("student_achievements")
        .select("achievement_key, awarded_at")
        .eq("anonymous_code", code),
    ]);

    return json({
      sessions:     sessions.data || [],
      checkins:     checkins.data || [],
      journal:      journal.data  || [],
      achievements: achievements.data || [],
    });
  }

    return json({ error: "action no soportado", action_received: action }, 400);
  } catch (err: any) {
    console.error("[anon-auth] FATAL:", err);
    // SIEMPRE devolvemos JSON con detalle, nunca un 5xx vacío.
    return json({
      error: "Error interno en anon-auth",
      detail: String(err?.message || err),
      stack: String(err?.stack || "").split("\n").slice(0, 5).join(" | "),
    }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: cors });
}
