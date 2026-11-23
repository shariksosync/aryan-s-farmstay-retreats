// Literal class strings so Tailwind keeps them.
export const STATUS_STYLES = {
  New: { badge: "bg-status-new/15 text-status-new ring-status-new/30", dot: "bg-status-new", color: "var(--status-new)" },
  Contacted: { badge: "bg-status-contacted/12 text-status-contacted ring-status-contacted/30", dot: "bg-status-contacted", color: "var(--status-contacted)" },
  "Follow-up": { badge: "bg-status-followup/15 text-status-followup ring-status-followup/30", dot: "bg-status-followup", color: "var(--status-followup)" },
  Interested: { badge: "bg-status-interested/12 text-status-interested ring-status-interested/30", dot: "bg-status-interested", color: "var(--status-interested)" },
  Confirmed: { badge: "bg-status-confirmed/12 text-status-confirmed ring-status-confirmed/30", dot: "bg-status-confirmed", color: "var(--status-confirmed)" },
  Completed: { badge: "bg-status-completed/15 text-status-completed ring-status-completed/30", dot: "bg-status-completed", color: "var(--status-completed)" },
  Cancelled: { badge: "bg-status-cancelled/12 text-status-cancelled ring-status-cancelled/30", dot: "bg-status-cancelled", color: "var(--status-cancelled)" },
  Lost: { badge: "bg-status-lost/12 text-status-lost ring-status-lost/30", dot: "bg-status-lost", color: "var(--status-lost)" },
};

export default function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.Lost;
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${s.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

export function PropertyBadge({ propertyId }) {
  const kolhe = propertyId === "new-kolhe-khind";
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-md px-2 py-1 text-[0.7rem] font-semibold ${
        kolhe ? "bg-forest/10 text-forest" : "bg-gold/20 text-gold-dark"
      }`}
    >
      {kolhe ? "Kolhe Khind" : "Manas Agro"}
    </span>
  );
}
