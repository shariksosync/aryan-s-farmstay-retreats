import { Link } from "@tanstack/react-router";
import Icon from "../Icons.jsx";

export default function AdminHeader({ title, subtitle, admin, onMenu, onProfile }) {
  const initials = admin.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="flex items-center gap-4 px-4 py-3.5 sm:px-8">
        <button onClick={onMenu} className="grid h-10 w-10 place-items-center rounded-xl border border-border text-deep lg:hidden" aria-label="Open menu">
          <Icon name="menu" />
        </button>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-2xl font-semibold text-deep sm:text-[1.7rem]">{title}</h1>
          {subtitle && <p className="hidden truncate text-xs text-muted-foreground sm:block">{subtitle}</p>}
        </div>
        <Link to="/" className="btn btn-quiet btn-sm hidden md:inline-flex">
          <Icon name="external" className="h-4 w-4" /> View Website
        </Link>
        <button onClick={onProfile} className="flex items-center gap-3 rounded-full py-1 pl-1 pr-1 transition hover:bg-muted sm:pr-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-forest text-sm font-semibold text-gold">{initials}</span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-semibold leading-tight text-deep">{admin.name}</span>
            <span className="block text-[0.7rem] leading-tight text-muted-foreground">{admin.role}</span>
          </span>
        </button>
      </div>
    </header>
  );
}
