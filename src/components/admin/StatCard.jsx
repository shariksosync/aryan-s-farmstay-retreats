import Icon from "../Icons.jsx";

const TONES = {
  forest: "bg-forest/10 text-forest",
  gold: "bg-gold/20 text-gold-dark",
  olive: "bg-olive/15 text-olive",
  blue: "bg-status-contacted/12 text-status-contacted",
  red: "bg-status-cancelled/12 text-status-cancelled",
  deep: "bg-deep text-gold",
};

export default function StatCard({ label, value, icon, tone = "forest", hint, onClick }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag onClick={onClick} className={`admin-card flex items-start justify-between gap-4 p-5 text-left ${onClick ? "transition hover:-translate-y-0.5 hover:shadow-soft" : ""}`}>
      <div className="min-w-0">
        <p className="text-[0.78rem] font-medium text-muted-foreground">{label}</p>
        <p className="mt-2 font-display text-4xl font-semibold leading-none text-deep">{value}</p>
        {hint && <p className="mt-2 truncate text-xs text-muted-foreground">{hint}</p>}
      </div>
      <span className={`hidden h-11 w-11 shrink-0 place-items-center rounded-xl sm:grid ${TONES[tone]}`}>
        <Icon name={icon} />
      </span>
    </Tag>
  );
}
