import { Link } from "@tanstack/react-router";
import Logo from "../Logo.jsx";
import Icon from "../Icons.jsx";

export const ADMIN_SECTIONS = [
  { id: "dashboard", label: "Dashboard", icon: "grid", group: "Overview" },
  { id: "kolhe", label: "New Kolhe Khind Farms Leads", short: "Kolhe Khind Leads", icon: "home", group: "Lead Management" },
  { id: "manas", label: "Manas Agro Farms Leads", short: "Manas Agro Leads", icon: "tree", group: "Lead Management" },
  { id: "all", label: "All Enquiries", icon: "inbox", group: "Lead Management" },
  { id: "experiences", label: "Experiences Management", short: "Experiences", icon: "sparkles", group: "Website" },
  { id: "gallery", label: "Gallery Management", short: "Gallery", icon: "image", group: "Website" },
  { id: "content", label: "Website Content Management", short: "Website Content", icon: "file", group: "Website" },
  { id: "contact", label: "Contact Information Management", short: "Contact Information", icon: "contact", group: "Website" },
  { id: "profile", label: "Admin Profile", icon: "user", group: "Account" },
];

export default function AdminSidebar({ active, onNavigate, onLogout, counts, open, onClose }) {
  const groups = [...new Set(ADMIN_SECTIONS.map((s) => s.group))];
  return (
    <>
      {open && <div className="fixed inset-0 z-40 bg-deep/60 backdrop-blur-sm lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pb-6 pt-7">
          <Logo tone="light" />
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-ivory/70 hover:bg-ivory/10 lg:hidden" aria-label="Close menu">
            <Icon name="x" />
          </button>
        </div>
        <p className="mx-6 mb-2 rounded-lg bg-ivory/5 px-3 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-gold">Admin Console</p>

        <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Admin">
          {groups.map((g) => (
            <div key={g} className="mb-2">
              <p className="px-3 pb-1.5 pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-ivory/40">{g}</p>
              {ADMIN_SECTIONS.filter((s) => s.group === g).map((s) => {
                const isActive = active === s.id;
                const count = counts[s.id];
                return (
                  <button
                    key={s.id}
                    onClick={() => onNavigate(s.id)}
                    className={`group mb-0.5 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[0.84rem] transition ${
                      isActive ? "bg-sidebar-accent text-ivory shadow-inner" : "text-ivory/70 hover:bg-ivory/5 hover:text-ivory"
                    }`}
                  >
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${isActive ? "bg-gold text-deep" : "bg-ivory/5 text-ivory/70 group-hover:text-gold"}`}>
                      <Icon name={s.icon} className="h-[1.05rem] w-[1.05rem]" />
                    </span>
                    <span className="flex-1 leading-tight">{s.label}</span>
                    {count > 0 && (
                      <span className={`rounded-full px-2 py-0.5 text-[0.68rem] font-semibold ${isActive ? "bg-gold text-deep" : "bg-ivory/10 text-ivory/80"}`}>{count}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <Link to="/" className="mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.84rem] text-ivory/70 transition hover:bg-ivory/5 hover:text-ivory">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ivory/5"><Icon name="external" className="h-4 w-4" /></span>
            View Website
          </Link>
          <button onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[0.84rem] text-ivory/70 transition hover:bg-status-cancelled/20 hover:text-ivory">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-ivory/5"><Icon name="logout" className="h-4 w-4" /></span>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
