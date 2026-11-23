import { useMemo } from "react";
import StatCard from "../components/admin/StatCard.jsx";
import StatusBadge, { PropertyBadge, STATUS_STYLES } from "../components/admin/StatusBadge.jsx";
import { SectionCard } from "../components/admin/FormControls.jsx";
import Icon from "../components/Icons.jsx";
import { useApp } from "../store/AppStore.jsx";
import { EXPERIENCE_TYPES, LEAD_STATUSES, PROPERTIES, PROPERTY_IDS } from "../data/mockData.js";
import { computeStats, formatDate, statusCounts } from "../lib/leads.js";

function weeklySeries(enquiries, weeks = 8) {
  if (enquiries.length === 0) return [];
  const latest = enquiries.reduce((m, e) => (e.createdAt > m ? e.createdAt : m), enquiries[0].createdAt);
  const end = new Date(latest.slice(0, 10) + "T23:59:59");
  const out = [];
  for (let i = weeks - 1; i >= 0; i--) {
    const to = new Date(end.getTime() - i * 7 * 864e5);
    const from = new Date(to.getTime() - 7 * 864e5);
    const inRange = enquiries.filter((e) => {
      const d = new Date(e.createdAt);
      return d > from && d <= to;
    });
    out.push({
      label: to.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      kolhe: inRange.filter((e) => e.property === PROPERTY_IDS.KOLHE).length,
      manas: inRange.filter((e) => e.property === PROPERTY_IDS.MANAS).length,
    });
  }
  return out;
}

function TrendChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.kolhe + d.manas));
  return (
    <div>
      <div className="flex h-52 items-end gap-2 sm:gap-4">
        {data.map((d) => {
          const total = d.kolhe + d.manas;
          return (
            <div key={d.label} className="group flex h-full flex-1 flex-col items-center justify-end">
              <span className="mb-1 text-xs font-semibold text-deep opacity-0 transition group-hover:opacity-100">{total}</span>
              <div className="flex w-full max-w-10 flex-col-reverse overflow-hidden rounded-t-lg" style={{ height: `${(total / max) * 100}%`, minHeight: total ? 6 : 2 }}>
                <div className="bg-forest" style={{ flexGrow: d.kolhe || 0.0001 }} />
                <div className="bg-gold" style={{ flexGrow: d.manas || 0.0001 }} />
                {total === 0 && <div className="h-0.5 bg-border" />}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-2 border-t border-border pt-2 sm:gap-4">
        {data.map((d) => (
          <span key={d.label} className="flex-1 text-center text-[0.65rem] text-muted-foreground">{d.label}</span>
        ))}
      </div>
      <div className="mt-4 flex gap-5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-forest" /> New Kolhe Khind Farms</span>
        <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-gold" /> Manas Agro Farms</span>
      </div>
    </div>
  );
}

function Donut({ items, total }) {
  const r = 60;
  const C = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <svg viewBox="0 0 160 160" className="h-44 w-44 shrink-0 -rotate-90" role="img" aria-label="Enquiry status distribution">
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--muted)" strokeWidth="20" />
        {items.filter((i) => i.count > 0).map((i) => {
          const len = (i.count / Math.max(total, 1)) * C;
          const el = (
            <circle key={i.status} cx="80" cy="80" r={r} fill="none" stroke={STATUS_STYLES[i.status].color} strokeWidth="20" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset}>
              <title>{`${i.status}: ${i.count}`}</title>
            </circle>
          );
          offset += len;
          return el;
        })}
        <text x="80" y="80" transform="rotate(90 80 80)" textAnchor="middle" dominantBaseline="central" className="fill-deep font-display" fontSize="30" fontWeight="600">{total}</text>
      </svg>
      <ul className="grid w-full grid-cols-2 gap-x-4 gap-y-2">
        {items.map((i) => (
          <li key={i.status} className="flex items-center gap-2 text-xs">
            <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${STATUS_STYLES[i.status].dot}`} />
            <span className="flex-1 text-ink">{i.status}</span>
            <span className="font-semibold text-deep">{i.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AdminDashboard({ onNavigate }) {
  const { enquiries, updateEnquiry, toast, admin } = useApp();
  const stats = useMemo(() => computeStats(enquiries), [enquiries]);
  const dist = useMemo(() => statusCounts(enquiries, LEAD_STATUSES), [enquiries]);
  const trend = useMemo(() => weeklySeries(enquiries), [enquiries]);
  const recent = useMemo(() => [...enquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 6), [enquiries]);
  const latestNew = useMemo(() => recent.length ? [...enquiries].filter((e) => e.status === "New").sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5) : [], [enquiries, recent.length]);
  const byExperience = useMemo(() => EXPERIENCE_TYPES.map((x) => ({ x, n: enquiries.filter((e) => e.experience === x).length })), [enquiries]);
  const maxExp = Math.max(1, ...byExperience.map((b) => b.n));

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 rounded-2xl bg-forest p-6 text-ivory sm:flex-row sm:items-center sm:p-7">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Welcome back</p>
          <h2 className="mt-1 font-display text-3xl font-semibold">Namaste, {admin.name.split(" ")[0]}</h2>
          <p className="mt-1 text-sm text-ivory/75">You have <strong className="text-gold">{stats.new}</strong> new enquiries awaiting a response.</p>
        </div>
        <button className="btn btn-gold btn-sm self-start sm:self-auto" onClick={() => onNavigate("all")}>
          Review enquiries <Icon name="arrowRight" className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        <StatCard label="Total Enquiries" value={stats.total} icon="inbox" tone="deep" hint="Across both farmhouses" onClick={() => onNavigate("all")} />
        <StatCard label="New Enquiries" value={stats.new} icon="sparkles" tone="gold" hint="Awaiting first contact" />
        <StatCard label="Contacted Leads" value={stats.contacted} icon="phone" tone="blue" hint="Contacted, follow-up, interested" />
        <StatCard label="Confirmed Bookings" value={stats.confirmed} icon="check" tone="forest" hint="Confirmed & completed" />
        <StatCard label="Closed / Lost Leads" value={stats.closedLost} icon="x" tone="red" hint="Cancelled & lost" />
        <StatCard label="New Kolhe Khind Farms" value={stats.kolhe} icon="home" tone="forest" hint="Property enquiries" onClick={() => onNavigate("kolhe")} />
        <StatCard label="Manas Agro Farms" value={stats.manas} icon="tree" tone="olive" hint="Property enquiries" onClick={() => onNavigate("manas")} />
        <StatCard label="Conversion Rate" value={`${stats.total ? Math.round((stats.confirmed / stats.total) * 100) : 0}%`} icon="trending" tone="gold" hint="Confirmed ÷ total" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <SectionCard title="Enquiries trend" description="Weekly enquiries by farmhouse (last 8 weeks)">
          <TrendChart data={trend} />
        </SectionCard>
        <SectionCard title="Enquiry status distribution" description="Live breakdown of every lead">
          <Donut items={dist} total={stats.total} />
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr_0.9fr]">
        {PROPERTIES.map((p) => {
          const list = enquiries.filter((e) => e.property === p.id);
          const s = computeStats(list);
          return (
            <SectionCard key={p.id} title={p.name} description="Property-wise enquiry summary" actions={<button className="btn btn-sm btn-quiet" onClick={() => onNavigate(p.id === PROPERTY_IDS.KOLHE ? "kolhe" : "manas")}>Open</button>}>
              <div className="grid grid-cols-4 gap-2 text-center">
                {[["Total", s.total], ["New", s.new], ["Booked", s.confirmed], ["Lost", s.closedLost]].map(([l, v]) => (
                  <div key={l} className="rounded-xl bg-cream py-3">
                    <p className="font-display text-2xl font-semibold text-deep">{v}</p>
                    <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-muted">
                {LEAD_STATUSES.map((st) => {
                  const n = list.filter((e) => e.status === st).length;
                  return n ? <div key={st} title={`${st}: ${n}`} className={STATUS_STYLES[st].dot} style={{ width: `${(n / list.length) * 100}%` }} /> : null;
                })}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                {list.length ? `${Math.round((s.confirmed / list.length) * 100)}% conversion · ${list.reduce((a, e) => a + Number(e.guests || 0), 0)} guests enquired` : "No enquiries yet"}
              </p>
            </SectionCard>
          );
        })}
        <SectionCard title="By experience" description="Popular occasions">
          <ul className="space-y-2.5">
            {byExperience.map((b) => (
              <li key={b.x} className="text-xs">
                <div className="mb-1 flex justify-between"><span className="text-ink">{b.x}</span><span className="font-semibold text-deep">{b.n}</span></div>
                <div className="h-1.5 rounded-full bg-muted"><div className="h-full rounded-full bg-olive" style={{ width: `${(b.n / maxExp) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <SectionCard title="Recent enquiries" description="Latest submissions from the website" actions={<button className="btn btn-sm btn-quiet" onClick={() => onNavigate("all")}>View all</button>}>
          <div className="-mx-5 -my-5 overflow-x-auto sm:-mx-6 sm:-my-6">
            <table className="w-full min-w-[560px] text-sm">
              <tbody>
                {recent.map((e) => (
                  <tr key={e.id} className="border-b border-border/70 last:border-0">
                    <td className="px-5 py-3 font-mono text-xs font-semibold text-forest sm:px-6">{e.id}</td>
                    <td className="py-3"><p className="font-medium text-deep">{e.customerName}</p><p className="text-xs text-muted-foreground">{e.experience}</p></td>
                    <td className="py-3"><PropertyBadge propertyId={e.property} /></td>
                    <td className="py-3 text-xs text-muted-foreground">{formatDate(e.createdAt)}</td>
                    <td className="py-3 pr-5 text-right sm:pr-6"><StatusBadge status={e.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Latest leads" description="New enquiries to call back">
          {latestNew.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">All caught up — no new leads.</p>
          ) : (
            <ul className="space-y-3">
              {latestNew.map((e) => (
                <li key={e.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/20 text-sm font-semibold text-gold-dark">
                    {e.customerName.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-deep">{e.customerName}</p>
                    <p className="truncate text-xs text-muted-foreground">{e.guests} guests · {formatDate(e.visitDate)}</p>
                  </div>
                  <a href={`tel:+91${e.phone}`} className="icon-btn" aria-label={`Call ${e.customerName}`}><Icon name="phone" className="h-4 w-4" /></a>
                  <button className="btn btn-sm btn-quiet" onClick={() => { updateEnquiry(e.id, { status: "Contacted" }); toast(`${e.id} marked as Contacted.`); }}>Mark contacted</button>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
