export function FormField({ label, error, hint, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="field-label">{label}</span>}
      {children}
      {hint && !error && <span className="mt-1.5 block text-xs text-muted-foreground">{hint}</span>}
      {error && <span className="mt-1.5 block text-xs font-medium text-destructive">{error}</span>}
    </label>
  );
}

export function Toggle({ checked, onChange, label, size = "md" }) {
  const sm = size === "sm";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={`relative inline-flex shrink-0 items-center rounded-full transition-colors ${checked ? "bg-forest" : "bg-input"} ${sm ? "h-5 w-9" : "h-6 w-11"}`}
    >
      <span
        className={`inline-block rounded-full bg-card shadow transition-transform ${sm ? "h-4 w-4" : "h-5 w-5"} ${
          checked ? (sm ? "translate-x-[18px]" : "translate-x-[22px]") : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export function SectionCard({ title, description, children, actions, className = "" }) {
  return (
    <section className={`admin-card ${className}`}>
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
          <div>
            <h3 className="font-display text-xl font-semibold text-deep">{title}</h3>
            {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}
