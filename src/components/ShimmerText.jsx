// =============================================================
// AURA — <ShimmerText>
// Texto con gradient animado tipo "shimmer" o "neon flow".
// Variants: aurora (lavanda-peach-oro), oro (institucional), sunset.
// =============================================================

export default function ShimmerText({
  children,
  as: Tag = 'span',
  variant = 'aurora',
  speed = 6,            // segundos
  className = '',
  style = {},
  ...rest
}) {
  const gradients = {
    aurora:  'linear-gradient(110deg, var(--c-lavanda-600) 10%, var(--c-peach-600) 40%, var(--c-durazno-600) 65%, var(--c-rosa-600) 90%)',
    oro:     'linear-gradient(110deg, var(--c-oro-700) 10%, var(--c-oro-400) 50%, var(--c-oro-600) 90%)',
    sunset:  'linear-gradient(110deg, var(--c-coral-600) 10%, var(--c-peach-600) 40%, var(--c-durazno-600) 65%, var(--c-coral-600) 90%)',
    mint:    'linear-gradient(110deg, var(--c-mint-700) 10%, var(--c-mint-500) 50%, var(--c-mint-600) 90%)',
  };
  const bg = gradients[variant] || gradients.aurora;

  return (
    <Tag
      className={`shimmer-text shimmer-${variant} ${className}`}
      style={{
        background: bg,
        backgroundSize: '300% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
        animation: `shimmerFlow ${speed}s linear infinite`,
        display: 'inline-block',
        ...style,
      }}
      {...rest}
    >
      {children}
      <style>{`
        @keyframes shimmerFlow {
          0%   { background-position:   0% center; }
          100% { background-position: 300% center; }
        }
        @media (prefers-reduced-motion: reduce) {
          .shimmer-text { animation: none !important; background-position: 50% center; }
        }
      `}</style>
    </Tag>
  );
}
