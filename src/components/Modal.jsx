import { useEffect } from "react";
import Icon from "./Icons.jsx";

const SIZES = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
};

export default function Modal({ open, onClose, title, subtitle, size = "md", children, footer, bare = false }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-deep/70 backdrop-blur-sm animate-in fade-in" onClick={onClose} />
      <div
        className={`relative flex max-h-[94vh] w-full ${SIZES[size]} flex-col overflow-hidden rounded-t-3xl bg-card shadow-2xl animate-in fade-in slide-in-from-bottom-4 sm:rounded-3xl`}
      >
        {bare ? (
          <>
            <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-deep/60 text-ivory backdrop-blur transition hover:bg-deep">
              <Icon name="x" />
            </button>
            <div className="overflow-y-auto">{children}</div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
              <div>
                <h3 className="font-display text-2xl font-semibold text-deep">{title}</h3>
                {subtitle && <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>}
              </div>
              <button onClick={onClose} aria-label="Close" className="icon-btn -mr-2 h-9 w-9">
                <Icon name="x" />
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-5">{children}</div>
            {footer && <div className="flex flex-wrap justify-end gap-2 border-t border-border bg-muted/40 px-6 py-4">{footer}</div>}
          </>
        )}
      </div>
    </div>
  );
}
