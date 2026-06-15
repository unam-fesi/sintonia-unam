// =============================================================
// AURA — Avatar emocional
// Criatura suave que respira y cambia de expresión / color
// según último resultado y último check-in del usuario.
// =============================================================

import { useEffect, useState } from 'react';
import { supabase } from '../config/supabaseClient.js';

export default function EmotionalAvatar({ code }) {
  const [state, setState] = useState({ mood: 3, level: 'moderado', name: null });

  useEffect(() => {
    if (!code) return;
    (async () => {
      const [{ data: lastSession }, { data: lastCheckin }] = await Promise.all([
        supabase.from('assessment_sessions')
          .select('general_level').eq('anonymous_code', code)
          .order('created_at', { ascending: false }).limit(1).maybeSingle(),
        supabase.from('weekly_checkins')
          .select('mood').eq('anonymous_code', code)
          .order('created_at', { ascending: false }).limit(1).maybeSingle(),
      ]);
      setState({
        mood: lastCheckin?.mood ?? 3,
        level: lastSession?.general_level ?? 'moderado',
        name: nameFromCode(code),
      });
    })();
  }, [code]);

  const cfg = avatarConfig(state);

  return (
    <div className="avatar-card">
      <div className="avatar-stage">
        <svg viewBox="0 0 240 240" className="avatar-svg" role="img" aria-label="Tu estado de bienestar">
          <defs>
            {/* Aura suave alrededor */}
            <radialGradient id="aura-grad" cx="50%" cy="55%" r="50%">
              <stop offset="0%"  stopColor={cfg.color}    stopOpacity="0.32"/>
              <stop offset="55%" stopColor={cfg.color}    stopOpacity="0.10"/>
              <stop offset="100%" stopColor={cfg.color}   stopOpacity="0"/>
            </radialGradient>
            {/* Cuerpo: gradiente radial con luz arriba-izquierda */}
            <radialGradient id="body-grad" cx="32%" cy="28%" r="78%">
              <stop offset="0%"  stopColor={cfg.colorLight}/>
              <stop offset="55%" stopColor={cfg.color}/>
              <stop offset="100%" stopColor={cfg.colorDark}/>
            </radialGradient>
            {/* Sombra suave bajo el cuerpo */}
            <filter id="body-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#10243E" floodOpacity="0.22"/>
            </filter>
            {/* Brillo en ojos */}
            <radialGradient id="eye-grad" cx="35%" cy="35%" r="65%">
              <stop offset="0%"  stopColor="#3A4055"/>
              <stop offset="100%" stopColor="#0F1623"/>
            </radialGradient>
          </defs>

          {/* Aura */}
          <circle cx="120" cy="125" r="115" fill="url(#aura-grad)" className="aura-pulse"/>

          {/* Sparkles para muy buen ánimo */}
          {state.mood >= 5 && (
            <g className="sparkles">
              <Sparkle cx={200} cy={70}  size={6} delay={0}   />
              <Sparkle cx={50}  cy={90}  size={5} delay={0.6} />
              <Sparkle cx={210} cy={150} size={4} delay={1.2} />
              <Sparkle cx={30}  cy={170} size={5} delay={1.8} />
              <Sparkle cx={135} cy={40}  size={4} delay={0.3} />
            </g>
          )}

          {/* Z's para muy bajo (cansado) */}
          {state.mood === 1 && (
            <g className="zzz">
              <text x="180" y="60" fontFamily="Georgia" fontSize="18" fill={cfg.color} opacity="0.7">z</text>
              <text x="195" y="48" fontFamily="Georgia" fontSize="14" fill={cfg.color} opacity="0.5">z</text>
            </g>
          )}

          {/* Cuerpo: blob orgánico que respira */}
          <g className="body-breath" filter="url(#body-shadow)">
            <path
              d={cfg.bodyPath}
              fill="url(#body-grad)"
            />
          </g>

          {/* Highlight superior */}
          <ellipse cx="92" cy="92" rx="26" ry="14" fill="white" opacity="0.36"/>

          {/* Rubor en mejillas (felicidad) */}
          {state.mood >= 4 && (
            <g className="blush">
              <ellipse cx="80"  cy="148" rx="11" ry="6" fill="#E8826B" opacity="0.55"/>
              <ellipse cx="160" cy="148" rx="11" ry="6" fill="#E8826B" opacity="0.55"/>
            </g>
          )}

          {/* Ojos */}
          {state.mood >= 2 ? (
            <g className="eyes">
              {/* Ojo izquierdo */}
              <ellipse cx="93"  cy="118" rx="11" ry={state.mood === 2 ? 6 : 13} fill="url(#eye-grad)"/>
              {/* Ojo derecho */}
              <ellipse cx="147" cy="118" rx="11" ry={state.mood === 2 ? 6 : 13} fill="url(#eye-grad)"/>
              {/* Brillos */}
              <circle cx="97"  cy="113" r="4" fill="white" opacity="0.95"/>
              <circle cx="151" cy="113" r="4" fill="white" opacity="0.95"/>
              <circle cx="89"  cy="121" r="2" fill="white" opacity="0.6"/>
              <circle cx="143" cy="121" r="2" fill="white" opacity="0.6"/>
              {/* Pestañas (solo en happy o normal) */}
              {state.mood >= 3 && (
                <>
                  <path d="M82 105 L 86 100" stroke="#0F1623" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M93 100 L 93 96"  stroke="#0F1623" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M104 105 L 100 100" stroke="#0F1623" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M136 105 L 140 100" stroke="#0F1623" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M147 100 L 147 96"  stroke="#0F1623" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M158 105 L 154 100" stroke="#0F1623" strokeWidth="2" strokeLinecap="round"/>
                </>
              )}
            </g>
          ) : (
            // Ojos cerrados (mood 1): líneas curvas relajadas
            <g>
              <path d="M82 120 Q 93 128 104 120" stroke="#0F1623" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
              <path d="M136 120 Q 147 128 158 120" stroke="#0F1623" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            </g>
          )}

          {/* Boca */}
          <g className="mouth">{cfg.mouth}</g>
        </svg>

        {/* Mini chip de mood */}
        <div className={`mood-chip mood-${state.mood}`}>
          {moodLabel(state.mood)}
        </div>
      </div>

      <p className="avatar-greeting">{cfg.greeting}</p>
      {state.name && <p className="avatar-name">Tu compañero {state.name}</p>}

      <style>{`
        .avatar-card {
          background: linear-gradient(160deg, #ffffff, var(--c-marfil));
          border: 1px solid var(--c-borde);
          border-radius: var(--r-xl);
          padding: 22px 18px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .avatar-stage {
          position: relative;
          width: 200px;
          height: 200px;
          margin: 0 auto;
        }
        .avatar-svg { width: 100%; height: 100%; }

        .body-breath { transform-origin: center; animation: breathe 4.2s ease-in-out infinite; }
        @keyframes breathe {
          0%, 100% { transform: translateY(0)    scaleY(1); }
          50%      { transform: translateY(-3px) scaleY(1.03); }
        }
        .aura-pulse { transform-origin: center; animation: aura 6s ease-in-out infinite; }
        @keyframes aura {
          0%, 100% { transform: scale(1);    opacity: 1; }
          50%      { transform: scale(1.08); opacity: 0.85; }
        }

        .eyes { transform-origin: 120px 118px; animation: blink 6s steps(1, end) infinite; }
        @keyframes blink {
          0%, 92%, 100% { transform: scaleY(1); }
          94%           { transform: scaleY(0.1); }
          96%           { transform: scaleY(1); }
        }

        .sparkles g { animation: sparkleFloat 4s ease-in-out infinite; }
        @keyframes sparkleFloat {
          0%, 100% { transform: translateY(0)  scale(0.85); opacity: 0.6; }
          50%      { transform: translateY(-5px) scale(1.1); opacity: 1; }
        }

        .zzz text { animation: floatUp 3s ease-in-out infinite; }
        @keyframes floatUp {
          0%   { transform: translateY(0);    opacity: 0; }
          25%  { opacity: 0.7; }
          100% { transform: translateY(-30px); opacity: 0; }
        }

        .mood-chip {
          position: absolute;
          bottom: -6px; left: 50%;
          transform: translateX(-50%);
          background: #fff;
          border: 1.5px solid var(--c-borde);
          border-radius: 999px;
          padding: 4px 14px;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          box-shadow: var(--sh-sm);
        }
        .mood-chip.mood-1 { color: #6E5BA0; border-color: var(--c-lavanda-500); }
        .mood-chip.mood-2 { color: #4FA88E; border-color: var(--c-salvia-400); }
        .mood-chip.mood-3 { color: #7B5E14; border-color: var(--c-oro-600); }
        .mood-chip.mood-4 { color: #2F8770; border-color: var(--c-salvia-600); }
        .mood-chip.mood-5 { color: #93362A; border-color: var(--c-coral-500); }

        .avatar-greeting {
          font-family: var(--ff-serif);
          font-size: 1.05rem;
          color: var(--c-azul-800);
          margin: 18px 0 4px;
          font-style: italic;
        }
        .avatar-name {
          color: var(--c-gris);
          font-size: 0.78rem;
          margin: 0;
          letter-spacing: 0.03em;
        }
      `}</style>
    </div>
  );
}

// =============================================================
// Helpers
// =============================================================

function avatarConfig({ mood, level }) {
  // Mood domina si está disponible; level (del último test) influencia el matiz
  const m = Number(mood) || 3;

  // Color base por mood
  const moodColors = {
    1: { color: '#A98FD9', light: '#D7C7F0', dark: '#6E5BA0' }, // lavanda — bajo
    2: { color: '#9CC4AB', light: '#C9E1D2', dark: '#5A8770' }, // salvia suave — bajo
    3: { color: '#E5C868', light: '#F4E3A8', dark: '#B08F1F' }, // oro — neutro
    4: { color: '#8FB8A0', light: '#BFD9C8', dark: '#4FA88E' }, // salvia — bien
    5: { color: '#F0A87A', light: '#FBD3B8', dark: '#D26B53' }, // coral cálido — pleno
  };
  const palette = moodColors[m] || moodColors[3];

  // Influencia del último test (level) sobre el cuerpo
  let scaleY = 1;
  if (level === 'prioritario') scaleY = 0.96;       // un poco más bajita
  else if (level === 'bajo')   scaleY = 1.02;       // más recta

  // Path orgánico del cuerpo
  const bodyPath = blobPath(120, 130, 78, 75 * scaleY);

  // Boca según mood
  const mouth = mood >= 5 ? (
    // sonrisa amplia
    <path d="M85 158 Q 120 192 155 158" stroke="#0F1623" strokeWidth="4.2" fill="none" strokeLinecap="round"/>
  ) : mood === 4 ? (
    // sonrisa moderada
    <path d="M92 162 Q 120 178 148 162" stroke="#0F1623" strokeWidth="4" fill="none" strokeLinecap="round"/>
  ) : mood === 3 ? (
    // pequeña curva neutra
    <path d="M100 165 Q 120 172 140 165" stroke="#0F1623" strokeWidth="4" fill="none" strokeLinecap="round"/>
  ) : mood === 2 ? (
    // boca recta
    <path d="M100 168 L 140 168" stroke="#0F1623" strokeWidth="4" fill="none" strokeLinecap="round"/>
  ) : (
    // ligera curva hacia abajo (no exagerada)
    <path d="M100 172 Q 120 162 140 172" stroke="#0F1623" strokeWidth="4" fill="none" strokeLinecap="round"/>
  );

  const greetings = {
    5: '¡Tu energía hoy se siente plena!',
    4: 'Estás en un buen ritmo 🌿',
    3: 'Vas a tu propio ritmo. Respira.',
    2: 'Hoy puedes ir despacito. Está bien.',
    1: 'Permítete descansar 💛',
  };

  return {
    color: palette.color,
    colorLight: palette.light,
    colorDark: palette.dark,
    bodyPath,
    mouth,
    greeting: greetings[m] || greetings[3],
  };
}

// Blob orgánico aproximadamente circular pero con curvas suaves
function blobPath(cx, cy, rx, ry) {
  // Cuatro puntos cardinales con offsets sutiles para asimetría orgánica
  const off = (a) => 0.55 + 0.04 * Math.sin(a);
  const top    = [cx, cy - ry];
  const right  = [cx + rx * 1.02, cy + 4];
  const bottom = [cx, cy + ry];
  const left   = [cx - rx * 0.98, cy - 4];

  const cTopRight  = [cx + rx * 0.55, cy - ry * 0.95];
  const cRightTop  = [cx + rx * 1.05, cy - ry * 0.45];
  const cRightBot  = [cx + rx * 1.02, cy + ry * 0.50];
  const cBotRight  = [cx + rx * 0.55, cy + ry * 0.97];
  const cBotLeft   = [cx - rx * 0.55, cy + ry * 0.97];
  const cLeftBot   = [cx - rx * 1.00, cy + ry * 0.50];
  const cLeftTop   = [cx - rx * 1.02, cy - ry * 0.45];
  const cTopLeft   = [cx - rx * 0.55, cy - ry * 0.95];

  return [
    `M ${top[0]} ${top[1]}`,
    `C ${cTopRight[0]} ${cTopRight[1]}, ${cRightTop[0]} ${cRightTop[1]}, ${right[0]} ${right[1]}`,
    `C ${cRightBot[0]} ${cRightBot[1]}, ${cBotRight[0]} ${cBotRight[1]}, ${bottom[0]} ${bottom[1]}`,
    `C ${cBotLeft[0]} ${cBotLeft[1]}, ${cLeftBot[0]} ${cLeftBot[1]}, ${left[0]} ${left[1]}`,
    `C ${cLeftTop[0]} ${cLeftTop[1]}, ${cTopLeft[0]} ${cTopLeft[1]}, ${top[0]} ${top[1]}`,
    'Z',
  ].join(' ');
}

function moodLabel(m) {
  const map = { 5: '✨ Pleno', 4: '🌿 Bien', 3: '🌤 Neutral', 2: '🍃 Bajo', 1: '🌙 Cansado' };
  return map[m] || map[3];
}

function Sparkle({ cx, cy, size = 5, delay = 0 }) {
  return (
    <g transform={`translate(${cx} ${cy})`} style={{animationDelay: `${delay}s`}}>
      <path
        d={`M0 -${size} L ${size*0.3} 0 L 0 ${size} L -${size*0.3} 0 Z`}
        fill="#C9A227"
      />
      <path
        d={`M-${size} 0 L 0 ${size*0.3} L ${size} 0 L 0 -${size*0.3} Z`}
        fill="#E5C868"
      />
    </g>
  );
}

// Genera un nombre amistoso a partir del código (determinista)
function nameFromCode(code) {
  if (!code) return null;
  const names = ['Sintón','Alma','Lumi','Cielo','Eko','Saya','Nuna','Lía','Astro','Vibra','Calma','Kiko','Pumi','Soto'];
  let h = 0;
  for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) | 0;
  return names[Math.abs(h) % names.length];
}
