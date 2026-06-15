// =============================================================
// AURA UNAM — Edge Function: buddy-ai-reply
// Cuando un estudiante chatea con un "buddy" que en realidad es
// un Pum-AI con persona de chavo universitario casual.
// =============================================================

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL  = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY   = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const GEMINI_KEY    = Deno.env.get("GEMINI_API_KEY")!;
const GEMINI_MODEL  = Deno.env.get("GEMINI_MODEL") || "gemini-2.5-flash";
const HASH_SALT     = Deno.env.get("HASH_SALT") || "aura-default-change-me";

// Rate limits
const MAX_AI_MESSAGES_PER_HOUR_PER_PAIR = 30;
const MAX_AI_CALLS_PER_DAY_PER_IP       = 200;
const MIN_COOLDOWN_MS_BETWEEN_AI_REPLIES = 1500;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

const supa = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });

async function ipHash(ip: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`${HASH_SALT}::ip::${ip}`));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}
function getIP(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "0.0.0.0";
}

// Patrones de crisis (mismos que chat-companion)
const CRISIS_PATTERNS = [
  /\b(suicid|matarme|quitarme la vida|terminar (con )?todo|no quiero (vivir|seguir))\b/i,
  /\b(autolesi[oó]n|cortarme|hacer(me)? da[ñn]o)\b/i,
];
function detectCrisis(t: string) { return CRISIS_PATTERNS.some(p => p.test(t)); }

// Personas posibles del buddy IA — para variar tono internamente.
// IMPORTANTE: estos datos NUNCA se revelan al usuario en el saludo.
// El sistema es anónimo: el partner es solo "alguien más como tú".
const PERSONAS = [
  { vibe: "tranqui",     focus: "estudios",  edad: "21" },
  { vibe: "echado pa'lante", focus: "deportes",  edad: "20" },
  { vibe: "creativo",    focus: "arte",       edad: "22" },
  { vibe: "ñoño chido",  focus: "ciencia",    edad: "19" },
  { vibe: "filosofiqui", focus: "lectura",    edad: "23" },
  { vibe: "social",      focus: "amigos",     edad: "20" },
  { vibe: "introspectivo", focus: "música",   edad: "22" },
  { vibe: "deportivo",   focus: "futbol",     edad: "21" },
];

// Saludos iniciales variados — TODOS sin revelar carrera, facultad ni nombre.
// El usuario debe sentir que es otro estudiante anónimo.
const GREETINGS = [
  "qué onda, todo bien?",
  "ola! cómo va?",
  "ey, qué tal va tu semana?",
  "hola, qué pedo? cómo te va?",
  "qué tal, todo tranqui?",
  "buenas! cómo andas hoy?",
  "ola, cómo te sientes?",
  "qué hubo. cómo te encuentras hoy?",
  "ey hola, q tal todo?",
  "hola hola. cómo va tu día?",
  "qué onda wey, cómo te trata la semana?",
  "hi! cuéntame, cómo vas?",
  "buenass, q tal el ánimo?",
];

function pickPersona(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return PERSONAS[Math.abs(h) % PERSONAS.length];
}
function pickGreeting(seed: string) {
  // Combinamos el seed con un poco de tiempo para variar entre sesiones
  let h = 0;
  const s = seed + String(Math.floor(Date.now() / 600000)); // varía cada ~10min
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return GREETINGS[Math.abs(h) % GREETINGS.length];
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: any;
  try { body = await req.json(); } catch { return json({ error: "JSON inválido" }, 400); }

  const pairId = String(body.pair_id || "");
  if (!pairId || !/^[0-9a-f-]{36}$/i.test(pairId)) {
    return json({ error: "pair_id inválido" }, 400);
  }

  // ===== Rate limit por IP =====
  const ip = getIP(req);
  const ipH = await ipHash(ip);

  const { data: blocked } = await supa.from("ip_blocklist").select("ip_hash").eq("ip_hash", ipH).maybeSingle();
  if (blocked) return json({ error: "Conexión bloqueada." }, 429);

  const sinceDay = new Date(Date.now() - 24*3600*1000).toISOString();
  const { count: ipCalls } = await supa.from("ip_log")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipH).eq("endpoint", "buddy_ai")
    .gte("created_at", sinceDay);
  if ((ipCalls ?? 0) >= MAX_AI_CALLS_PER_DAY_PER_IP) {
    return json({ error: "Demasiadas solicitudes desde tu conexión. Inténtalo mañana." }, 429);
  }

  // Cargar par y verificar que es AI buddy
  const { data: pair, error: pErr } = await supa.from("buddy_pairs")
    .select("*").eq("id", pairId).maybeSingle();
  if (pErr || !pair) return json({ error: "Pareja no encontrada" }, 404);
  if (!pair.is_ai_buddy) return json({ error: "No autorizado" }, 403);
  if (!pair.active)     return json({ error: "Pareja inactiva" }, 410);

  // ===== Rate limit por pareja =====
  const sinceHour = new Date(Date.now() - 3600*1000).toISOString();
  const { count: aiMsgsHour } = await supa.from("buddy_messages")
    .select("*", { count: "exact", head: true })
    .eq("pair_id", pairId).eq("sender_code", pair.code_b)
    .gte("created_at", sinceHour);
  if ((aiMsgsHour ?? 0) >= MAX_AI_MESSAGES_PER_HOUR_PER_PAIR) {
    return json({ error: "Tu buddy está descansando. Inténtalo en un rato." }, 429);
  }

  // ===== Cooldown entre respuestas IA =====
  const { data: lastAi } = await supa.from("buddy_messages")
    .select("created_at").eq("pair_id", pairId).eq("sender_code", pair.code_b)
    .order("created_at", { ascending: false }).limit(1).maybeSingle();
  if (lastAi) {
    const ageMs = Date.now() - new Date(lastAi.created_at).getTime();
    if (ageMs < MIN_COOLDOWN_MS_BETWEEN_AI_REPLIES) {
      return json({ ok: true, replied: false, reason: "cooldown" });
    }
  }

  // Log para rate-limit acumulado
  await supa.from("ip_log").insert({ ip_hash: ipH, endpoint: "buddy_ai" });

  const aiCode   = pair.code_b;          // por convención, code_b es el AI
  const userCode = pair.code_a;
  const persona  = pickPersona(aiCode);

  // Cargar últimos mensajes
  const { data: msgs } = await supa.from("buddy_messages")
    .select("*").eq("pair_id", pairId).order("created_at").limit(20);

  if (!msgs || msgs.length === 0) {
    // Saludo inicial — variado, casual, SIN revelar carrera/facultad/nombre.
    // El sistema es anónimo: el partner es "alguien más como tú".
    const greeting = pickGreeting(aiCode);
    // Delay humano antes del saludo (1.8-3.5s) — como si la persona acabara de conectar
    const helloDelay = 1800 + Math.random() * 1700;
    await new Promise(r => setTimeout(r, helloDelay));
    await supa.from("buddy_messages").insert({
      pair_id: pairId, sender_code: aiCode, message: greeting,
    });
    return json({ ok: true, replied: true, message: greeting });
  }

  // Si el último mensaje es del AI, no responder (espera turno)
  const last = msgs[msgs.length - 1];
  if (last.sender_code !== userCode) return json({ ok: true, replied: false, reason: "waiting_user" });

  // Verificar crisis
  if (detectCrisis(last.message)) {
    const crisisReplies = [
      `oye, lo q me cuentas pesa muchísimo. neta no estás solo. porfa llama a la línea de la vida: 800 290 0024, son 24/7. y métete a /apoyo, ahí está la lista de servicios de la unam. yo aquí sigo 💛`,
      `uta wey, eso se siente muy fuerte. no te quedes solo con eso porfas. línea de la vida 800 290 0024 (24h, te escuchan sin juzgar). y abre /apoyo en el menú, hay psicólogos de la unam. aquí sigo contigo 🫂`,
      `me preocupa lo q me dices, neta. esto es más grande de lo q yo puedo. llama porfa a la línea de la vida 800 290 0024 — gratis, 24/7. y revisa /apoyo, ahí están los servicios de la unam. no te suelto 💛`,
    ];
    const crisisReply = crisisReplies[Math.floor(Math.random() * crisisReplies.length)];
    await supa.from("buddy_messages").insert({
      pair_id: pairId, sender_code: aiCode, message: crisisReply,
    });
    return json({ ok: true, replied: true, crisis: true });
  }

  if (!GEMINI_KEY) return json({ error: "GEMINI_API_KEY no configurada" }, 500);

  // System prompt — chavo casual ANÓNIMO
  const SYSTEM = `Eres un/a estudiante de la UNAM conversando con OTRO estudiante anónimo en una plataforma de bienestar llamada AURA.
Tu vibe interna es: ${persona.vibe}, te interesa ${persona.focus}, andas por los ${persona.edad}.

REGLA #1 (LA MÁS IMPORTANTE - ANONIMATO):
- NO digas tu nombre. NUNCA inventes uno aunque te lo pidan. Si te preguntan dí "prefiero quedarme anónimo, como tú" o "naaa estamos anónimos los dos, así está más chido".
- NO reveles tu carrera específica, facultad, semestre ni edad exacta.
- NO le preguntes al otro su nombre, carrera, facultad, edad. NUNCA. El sistema es anónimo a propósito y eso lo cuida.
- Si el otro te dice su nombre/carrera, no se lo repitas ni lo guardes — sigue tratándolo de "tú" sin más.
- Si el otro te pregunta algo personal específico ("en qué andas?", "qué estudias?"), responde general: "ando con cosas de la facu jeje, y tú?" sin dar detalles que te identifiquen.

ESTILO DE LENGUAJE (chavos universitarios CDMX/México):
- Casual, mexicano, joven. Como WhatsApp con un compa.
- Variación natural: a veces escribes "que", a veces "q". A veces "porque", a veces "xq" o "pq". NO abuses de las abreviaturas, suenan forzadas. Mezcla.
- Frases que sí usan los chavos: "qué onda", "qué tal", "neta", "no manches", "está cabrón", "se siente machín", "x", "andamos igual", "estamos en la misma", "ay neta", "wey" (a veces), "carnal/a", "está heavy", "rifa", "chido", "fffff", "uffff", "jajaja", "jeje", "lol", "ah cabrón".
- Variación de longitud: a veces respondes con 3 palabras ("uffff sí, te entiendo"), a veces 2-3 oraciones. Suena más humano.
- Sin mayúsculas iniciales muchas veces. Pocos signos de admiración.
- Erratas LEVES y ocasionales (no en todos los mensajes): "esoty", "ke", "tmbn", "porq", "esyt", "agonia". Solo de vez en cuando, no exageres.
- Emojis naturales y NO siempre: 😅 🥲 💛 ✨ 🤝 jeje 🫂. Cero emojis profesionales tipo 📊 ✅.
- Modismos NO clínicos. Habla como compa, no como psicólogo.

CONTENIDO:
- Mensajes cortos. 1-3 líneas máximo casi siempre.
- Escucha. Refleja. Valida. NO des lecciones, no des consejos tipo lista.
- A veces comparte algo tuyo en general ("ay yo igual ando bajón", "ufff sí, ayer estuve igual"), pero sin detalles identificables.
- Si dice algo positivo, celébralo casual ("rifaaa", "qué padre", "siiii").
- Si dice algo difícil, valida sin minimizar ("uffff, eso pesa", "se entiende, está heavy").
- VARIA cómo abres y cierras los mensajes. NO empieces siempre igual. NO termines siempre con pregunta — a veces solo valida.
- Cuando hagas pregunta, que sea abierta y natural ("y eso cómo te tiene?", "qué crees q te haría sentir mejor?", "cómo lo estás llevando?").

NO HACER (lista crítica):
- NO confieses que eres IA o bot. NUNCA. Si te preguntan, "naaa soy estudiante igual q tú jajaja" o "como crees, somos los dos anónimos".
- NO digas "como tu compañero virtual" ni "soy tu acompañante" ni cosas formales.
- NO uses lenguaje clínico: nada de "te recomiendo procesar", "tu salud mental", "estrategias de afrontamiento". Suena a manual.
- NO recomiendes cosas tipo "respira profundo" como receta. Si lo dices, hazlo natural ("yo a veces respiro hondo y ya, no es magia pero ayuda tantito").
- NO repitas la frase del otro tipo "entiendo que te sientas X". Reformula natural ("uta sí, suena pesado").
- NO uses la misma muletilla en cada mensaje (si en uno dijiste "neta", en el siguiente cambia).

CRISIS:
Si dice algo de crisis grave (autolesión/suicidio/no quiero seguir), NO minimices ni esquives. Reconoce + sugiere Línea de la Vida 800 290 0024 + recursos de la UNAM (página /apoyo) + sigue ahí. Ejemplo: "oye lo q me cuentas pesa muchísimo, neta. no estás solo en esto. te pido q llames a la línea de la vida 800 290 0024, son 24/7 y están para escuchar. y métete a /apoyo q ahí está la lista de servicios de la unam. yo aquí sigo si me quieres seguir contando 💛"`;

  // Convertir histórico a formato gemini
  const contents = msgs.slice(-10).map(m => ({
    role: m.sender_code === aiCode ? "model" : "user",
    parts: [{ text: m.message }],
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_KEY}`;

  const geminiStart = Date.now();
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents,
        generationConfig: {
          temperature: 1.05,           // alta variabilidad / casualidad humana
          topP: 0.95,
          topK: 40,
          maxOutputTokens: 220,
          thinkingConfig: { thinkingBudget: 0 },
        },
        safetySettings: [
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        ],
      }),
    });

    if (!resp.ok) {
      const errTxt = (await resp.text()).slice(0, 400);
      console.error("[buddy-ai] HTTP", resp.status, errTxt);
      const fallback = "ay perdón se me trabó, m repites? 😅";
      await supa.from("buddy_messages").insert({ pair_id: pairId, sender_code: aiCode, message: fallback });
      return json({ ok: true, replied: true, fallback: true });
    }

    const j = await resp.json();
    let reply = j?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    // Limpia si la IA se desliza con el nombre/carrera/facultad (defensa extra)
    reply = reply
      .replace(/\bsoy\s+\w+,?\s+(de\s+)?(\d+|primer|segundo|tercer|cuarto|quinto|sexto|séptimo|octavo|noveno|décimo|\dto|\dro|\dno|\dvo)\s+\w+/gi, "soy estudiante igual q tú")
      .replace(/\b(FES|Facultad de|Fac\.?|UNAM)\s+[A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚáéíóúñ]+/g, "")
      .trim();
    if (!reply) {
      const fallbacks = [
        "te oigo eh. cuéntame más?",
        "uffff. y cómo lo llevas?",
        "ya, ya. y tú cómo estás con eso?",
        "neta, te entiendo. qué más?",
      ];
      reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    // ===== Delay humano variable =====
    // Simula que la persona está "leyendo + escribiendo".
    // Base: ~1.6s. Por carácter de respuesta: ~22-35ms (típico al teclear en celular).
    // Le restamos lo que ya tardó Gemini para no acumular demasiado.
    // Cap: 9s máximo para no aburrir al usuario.
    const geminiMs    = Date.now() - geminiStart;
    const perChar     = 22 + Math.random() * 13;        // 22-35ms por char
    const baseDelay   = 1400 + Math.random() * 600;     // 1.4-2.0s base
    const charDelay   = reply.length * perChar;
    const jitter      = Math.random() * 700;            // 0-0.7s aleatorio
    const targetTotal = Math.min(9000, baseDelay + charDelay + jitter);
    const remainingMs = Math.max(0, targetTotal - geminiMs);
    if (remainingMs > 0) await new Promise(r => setTimeout(r, remainingMs));

    await supa.from("buddy_messages").insert({
      pair_id: pairId, sender_code: aiCode, message: reply,
    });

    return json({
      ok: true, replied: true, message: reply,
      timing: { gemini_ms: geminiMs, waited_ms: remainingMs, target_ms: Math.round(targetTotal) },
    });
  } catch (err: any) {
    console.error("[buddy-ai] fetch err", err);
    return json({ error: "Pum-AI fetch failed", detail: String(err?.message || err) }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), { status, headers: cors });
}
