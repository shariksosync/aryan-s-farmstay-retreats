import { useApp } from "../store/AppStore.jsx";
import Icon from "./Icons.jsx";

export default function Toaster() {
  const { toasts, dismissToast } = useApp();
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-[calc(100%-2.5rem)] max-w-sm flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`pointer-events-auto flex items-start gap-3 rounded-2xl border px-4 py-3.5 shadow-xl animate-toast-in ${
            t.type === "error" ? "border-destructive/30 bg-card text-ink" : "border-gold/40 bg-deep text-ivory"
          }`}
        >
          <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${t.type === "error" ? "bg-destructive/15 text-destructive" : "bg-gold text-deep"}`}>
            <Icon name={t.type === "error" ? "alert" : "check"} className="h-3.5 w-3.5" strokeWidth={2.4} />
          </span>
          <p className="flex-1 text-sm leading-snug">{t.message}</p>
          <button onClick={() => dismissToast(t.id)} aria-label="Dismiss" className="opacity-60 transition hover:opacity-100">
            <Icon name="x" className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
