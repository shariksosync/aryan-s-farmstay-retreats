export default function Logo({ tone = "dark", compact = false }) {
  const light = tone === "light";
  return (
    <span className="inline-flex items-center gap-3">
      <span
        className={`grid h-11 w-11 place-items-center rounded-full border ${light ? "border-gold/60 text-gold" : "border-forest/25 text-forest"}`}
      >
        <svg viewBox="0 0 40 40" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 22 20 10l14 12" />
          <path d="M10 19v13h20V19" />
          <path d="M20 32c0-6 1.5-9.5 6-12-6 .2-9 3.4-9 8" />
          <path d="M20 32c-.5-3-2-5-5-6" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[1.55rem] font-semibold tracking-tight ${light ? "text-ivory" : "text-deep"}`}>
          Aryan's
        </span>
        {!compact && (
          <span className={`mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.38em] ${light ? "text-gold" : "text-olive"}`}>
            Farmstays
          </span>
        )}
      </span>
    </span>
  );
}
