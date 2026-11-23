import { useEffect, useMemo, useState } from "react";
import Icon from "../Icons.jsx";
import Modal from "../Modal.jsx";
import ConfirmDialog from "../ConfirmDialog.jsx";
import DataTable from "./DataTable.jsx";
import StatusBadge, { PropertyBadge, STATUS_STYLES } from "./StatusBadge.jsx";
import { FormField } from "./FormControls.jsx";
import { useApp } from "../../store/AppStore.jsx";
import { EXPERIENCE_TYPES, LEAD_STATUSES, PROPERTIES } from "../../data/mockData.js";
import { filterLeads, formatDate, leadsForProperty, normalizePhone, propertyName, validateEnquiry } from "../../lib/leads.js";

const DEFAULT_FILTERS = { search: "", status: "all", experience: "all", propertyId: "all", dateFrom: "", dateTo: "", sort: "newest" };

/**
 * Lead management used by the two property modules and All Enquiries.
 * When `propertyId` is set, the module only ever reads and writes leads with that property ID.
 */
export default function LeadManager({ propertyId, showProperty = false }) {
  const { enquiries, updateEnquiry, deleteEnquiry, addEnquiry, toast } = useApp();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [viewing, setViewing] = useState(null);
  const [editing, setEditing] = useState(null);
  const [statusFor, setStatusFor] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => setFilters(DEFAULT_FILTERS), [propertyId]);

  const base = useMemo(() => (propertyId ? leadsForProperty(enquiries, propertyId) : enquiries), [enquiries, propertyId]);
  const rows = useMemo(() => filterLeads(base, { ...filters, propertyId: propertyId || filters.propertyId }), [base, filters, propertyId]);
  const counts = useMemo(() => {
    const c = {};
    LEAD_STATUSES.forEach((s) => (c[s] = base.filter((e) => e.status === s).length));
    return c;
  }, [base]);

  // Keep open modals in sync with latest data.
  const viewingLive = viewing ? enquiries.find((e) => e.id === viewing.id) : null;
  const set = (k) => (e) => setFilters((f) => ({ ...f, [k]: e.target.value }));
  const activeFilters = Object.keys(DEFAULT_FILTERS).some((k) => k !== "sort" && filters[k] !== DEFAULT_FILTERS[k]);

  const columns = [
    { key: "id", header: "Enquiry ID", render: (r) => <span className="font-mono text-xs font-semibold text-forest">{r.id}</span> },
    {
      key: "customerName",
      header: "Customer Name",
      render: (r) => (
        <div>
          <p className="font-medium text-deep">{r.customerName}</p>
          {r.email && <p className="max-w-[180px] truncate text-xs text-muted-foreground">{r.email}</p>}
        </div>
      ),
    },
    { key: "phone", header: "Mobile Number", render: (r) => <a href={`tel:+91${r.phone}`} onClick={(e) => e.stopPropagation()} className="whitespace-nowrap hover:text-forest">{r.phone}</a> },
    ...(showProperty ? [{ key: "property", header: "Farmhouse", render: (r) => <PropertyBadge propertyId={r.property} /> }] : []),
    { key: "experience", header: "Experience Type", render: (r) => <span className="whitespace-nowrap">{r.experience}</span> },
    { key: "visitDate", header: "Visit Date", render: (r) => <span className="whitespace-nowrap">{formatDate(r.visitDate)}</span> },
    { key: "guests", header: "Guests", className: "text-center", headClassName: "text-center" },
    { key: "status", header: "Status", render: (r) => <StatusBadge status={r.status} /> },
    { key: "createdAt", header: "Created Date", render: (r) => <span className="whitespace-nowrap text-muted-foreground">{formatDate(r.createdAt)}</span> },
    {
      key: "actions",
      header: "Actions",
      render: (r) => (
        <div className="flex items-center gap-0.5" onClick={(e) => e.stopPropagation()}>
          <button className="icon-btn" title="View" aria-label={`View ${r.id}`} onClick={() => setViewing(r)}><Icon name="eye" className="h-4 w-4" /></button>
          <button className="icon-btn" title="Edit" aria-label={`Edit ${r.id}`} onClick={() => setEditing(r)}><Icon name="edit" className="h-4 w-4" /></button>
          <button className="icon-btn" title="Update status" aria-label={`Update status of ${r.id}`} onClick={() => setStatusFor(r)}><Icon name="tag" className="h-4 w-4" /></button>
          <button className="icon-btn icon-btn-danger" title="Delete" aria-label={`Delete ${r.id}`} onClick={() => setDeleting(r)}><Icon name="trash" className="h-4 w-4" /></button>
        </div>
      ),
    },
  ];

  const changeStatus = (lead, status) => {
    updateEnquiry(lead.id, { status });
    toast(`${lead.id} marked as ${status}.`);
  };

  return (
    <div className="space-y-5">
      {/* Status chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setFilters((f) => ({ ...f, status: "all" }))}
          className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition ${filters.status === "all" ? "border-forest bg-forest text-ivory" : "border-border bg-card text-ink hover:border-forest"}`}
        >
          All · {base.length}
        </button>
        {LEAD_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => setFilters((f) => ({ ...f, status: f.status === s ? "all" : s }))}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
              filters.status === s ? "border-forest bg-forest text-ivory" : "border-border bg-card text-ink hover:border-forest"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[s].dot}`} /> {s} · {counts[s]}
          </button>
        ))}
      </div>

      <div className="admin-card">
        {/* Filters */}
        <div className="grid gap-3 border-b border-border p-4 sm:grid-cols-2 lg:grid-cols-12 sm:p-5">
          <div className={`relative sm:col-span-2 ${showProperty ? "lg:col-span-3" : "lg:col-span-4"}`}>
            <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input className="field pl-10" placeholder="Search name, phone or ID…" value={filters.search} onChange={set("search")} aria-label="Search leads" />
          </div>
          {showProperty && (
            <select className="field lg:col-span-2" value={filters.propertyId} onChange={set("propertyId")} aria-label="Filter by farmhouse">
              <option value="all">All farmhouses</option>
              {PROPERTIES.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          )}
          <select className="field lg:col-span-2" value={filters.status} onChange={set("status")} aria-label="Filter by status">
            <option value="all">All statuses</option>
            {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className={`field ${showProperty ? "lg:col-span-2" : "lg:col-span-2"}`} value={filters.experience} onChange={set("experience")} aria-label="Filter by experience">
            <option value="all">All experiences</option>
            {EXPERIENCE_TYPES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className={`field ${showProperty ? "lg:col-span-3" : "lg:col-span-4"}`} value={filters.sort} onChange={set("sort")} aria-label="Sort">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
          <div className="flex flex-wrap items-center gap-2 sm:col-span-2 lg:col-span-12">
            <span className="text-xs font-medium text-muted-foreground"><Icon name="calendar" className="mr-1 inline h-3.5 w-3.5" />Visit date</span>
            <input type="date" className="field w-auto py-2 text-xs" value={filters.dateFrom} onChange={set("dateFrom")} aria-label="Visit date from" />
            <span className="text-xs text-muted-foreground">to</span>
            <input type="date" className="field w-auto py-2 text-xs" value={filters.dateTo} onChange={set("dateTo")} aria-label="Visit date to" />
            {activeFilters && (
              <button className="btn btn-sm btn-quiet" onClick={() => setFilters(DEFAULT_FILTERS)}>
                <Icon name="refresh" className="h-3.5 w-3.5" /> Clear filters
              </button>
            )}
            <span className="ml-auto text-xs text-muted-foreground">
              Showing <strong className="text-deep">{rows.length}</strong> of {base.length}
            </span>
            <button className="btn btn-sm btn-forest" onClick={() => setEditing({ __new: true, property: propertyId || "" })}>
              <Icon name="plus" className="h-4 w-4" /> Add lead
            </button>
          </div>
        </div>

        <DataTable columns={columns} rows={rows} onRowClick={setViewing} empty={activeFilters ? "No leads match these filters." : "No enquiries yet."} />
      </div>

      <LeadDetailModal
        lead={viewingLive}
        onClose={() => setViewing(null)}
        onEdit={(l) => { setViewing(null); setEditing(l); }}
        onDelete={(l) => setDeleting(l)}
        onStatus={changeStatus}
        onSaveNotes={(l, notes) => { updateEnquiry(l.id, { adminNotes: notes }); toast(`Notes saved for ${l.id}.`); }}
      />

      <LeadEditModal
        lead={editing}
        lockProperty={Boolean(propertyId)}
        onClose={() => setEditing(null)}
        onSave={(data) => {
          if (editing.__new) {
            const created = addEnquiry(data);
            if (data.status !== "New" || data.adminNotes) updateEnquiry(created.id, { status: data.status, adminNotes: data.adminNotes });
            toast(`Lead ${created.id} added to ${propertyName(created.property)}.`);
          } else {
            updateEnquiry(editing.id, { ...data, phone: normalizePhone(data.phone), guests: Number(data.guests), property: propertyId || data.property });
            toast(`Lead ${editing.id} updated.`);
          }
          setEditing(null);
        }}
      />

      <StatusModal lead={statusFor} onClose={() => setStatusFor(null)} onPick={(s) => { changeStatus(statusFor, s); setStatusFor(null); }} />

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete this lead?"
        message={deleting ? `Lead ${deleting.id} from ${deleting.customerName} (${propertyName(deleting.property)}) will be permanently removed. This cannot be undone.` : ""}
        onClose={() => setDeleting(null)}
        onConfirm={() => {
          deleteEnquiry(deleting.id);
          if (viewing?.id === deleting.id) setViewing(null);
          toast(`Lead ${deleting.id} deleted.`);
        }}
      />
    </div>
  );
}

function Detail({ label, children }) {
  return (
    <div>
      <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-deep">{children}</dd>
    </div>
  );
}

function LeadDetailModal({ lead, onClose, onEdit, onDelete, onStatus, onSaveNotes }) {
  const [notes, setNotes] = useState("");
  useEffect(() => setNotes(lead?.adminNotes || ""), [lead?.id, lead?.adminNotes]);
  if (!lead) return null;
  const dirty = notes !== (lead.adminNotes || "");
  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={lead.customerName}
      subtitle={`${lead.id} · ${propertyName(lead.property)}`}
      footer={
        <>
          <button className="btn btn-sm btn-quiet mr-auto text-destructive" onClick={() => onDelete(lead)}><Icon name="trash" className="h-4 w-4" /> Delete</button>
          <button className="btn btn-sm btn-quiet" onClick={onClose}>Close</button>
          <button className="btn btn-sm btn-forest" onClick={() => onEdit(lead)}><Icon name="edit" className="h-4 w-4" /> Edit lead</button>
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={lead.status} />
        <PropertyBadge propertyId={lead.property} />
        <span className="text-xs text-muted-foreground">Created {formatDate(lead.createdAt)}</span>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
        <Detail label="Mobile"><a className="hover:text-forest" href={`tel:+91${lead.phone}`}>{lead.phone}</a></Detail>
        <Detail label="Email">{lead.email ? <a className="break-all hover:text-forest" href={`mailto:${lead.email}`}>{lead.email}</a> : "—"}</Detail>
        <Detail label="Experience">{lead.experience}</Detail>
        <Detail label="Visit date">{formatDate(lead.visitDate)}</Detail>
        <Detail label="Guests">{lead.guests}</Detail>
        <Detail label="Farmhouse">{propertyName(lead.property)}</Detail>
      </dl>

      <div className="mt-6 rounded-2xl bg-cream p-4">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Customer message</p>
        <p className="mt-1.5 text-sm leading-relaxed text-ink">{lead.message || "No message provided."}</p>
      </div>

      <div className="mt-6">
        <p className="field-label">Update status</p>
        <div className="flex flex-wrap gap-2">
          {LEAD_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => s !== lead.status && onStatus(lead, s)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                s === lead.status ? "border-forest bg-forest text-ivory" : "border-border text-ink hover:border-forest"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${STATUS_STYLES[s].dot}`} /> {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <label className="field-label" htmlFor="admin-notes">Internal admin notes</label>
        <textarea id="admin-notes" rows={3} className="field resize-none" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Visible only to admins — call outcomes, quotes, preferences…" />
        <div className="mt-2 flex justify-end">
          <button className="btn btn-sm btn-gold" disabled={!dirty} onClick={() => onSaveNotes(lead, notes)}>
            <Icon name="check" className="h-4 w-4" /> Save notes
          </button>
        </div>
      </div>
    </Modal>
  );
}

function LeadEditModal({ lead, lockProperty, onClose, onSave }) {
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (!lead) return setForm(null);
    setErrors({});
    setForm({
      customerName: lead.customerName || "",
      phone: lead.phone || "",
      email: lead.email || "",
      property: lead.property || "",
      experience: lead.experience || "",
      visitDate: lead.visitDate || "",
      guests: lead.guests ?? "",
      message: lead.message || "",
      status: lead.status || "New",
      adminNotes: lead.adminNotes || "",
    });
  }, [lead]);
  if (!lead || !form) return null;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const errs = validateEnquiry(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) onSave(form);
  };
  const isNew = Boolean(lead.__new);
  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={isNew ? "Add new lead" : `Edit lead ${lead.id}`}
      subtitle={isNew ? "Manually record a phone or walk-in enquiry" : propertyName(lead.property)}
      footer={
        <>
          <button className="btn btn-sm btn-quiet" onClick={onClose}>Cancel</button>
          <button className="btn btn-sm btn-forest" form="lead-edit-form" type="submit"><Icon name="check" className="h-4 w-4" /> {isNew ? "Add lead" : "Save changes"}</button>
        </>
      }
    >
      <form id="lead-edit-form" onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
        <FormField label="Customer name" error={errors.customerName}><input className="field" value={form.customerName} onChange={set("customerName")} /></FormField>
        <FormField label="Mobile number" error={errors.phone}><input className="field" value={form.phone} onChange={set("phone")} inputMode="tel" /></FormField>
        <FormField label="Email" error={errors.email}><input className="field" value={form.email} onChange={set("email")} /></FormField>
        <FormField label="Farmhouse" error={errors.property} hint={lockProperty ? "Leads stay within this property's module." : undefined}>
          <select className="field" value={form.property} onChange={set("property")} disabled={lockProperty}>
            <option value="">Select farmhouse</option>
            {PROPERTIES.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </FormField>
        <FormField label="Experience type" error={errors.experience}>
          <select className="field" value={form.experience} onChange={set("experience")}>
            <option value="">Select experience</option>
            {EXPERIENCE_TYPES.map((x) => <option key={x}>{x}</option>)}
          </select>
        </FormField>
        <FormField label="Visit date" error={errors.visitDate}><input type="date" className="field" value={form.visitDate} onChange={set("visitDate")} /></FormField>
        <FormField label="Guests" error={errors.guests}><input type="number" min="1" className="field" value={form.guests} onChange={set("guests")} /></FormField>
        <FormField label="Status">
          <select className="field" value={form.status} onChange={set("status")}>
            {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
          </select>
        </FormField>
        <FormField label="Customer message" className="sm:col-span-2"><textarea rows={3} className="field resize-none" value={form.message} onChange={set("message")} /></FormField>
        <FormField label="Internal admin notes" className="sm:col-span-2"><textarea rows={3} className="field resize-none" value={form.adminNotes} onChange={set("adminNotes")} /></FormField>
      </form>
    </Modal>
  );
}

function StatusModal({ lead, onClose, onPick }) {
  if (!lead) return null;
  return (
    <Modal open onClose={onClose} size="sm" title="Update status" subtitle={`${lead.id} · ${lead.customerName}`}>
      <div className="grid grid-cols-2 gap-2">
        {LEAD_STATUSES.map((s) => (
          <button
            key={s}
            onClick={() => onPick(s)}
            className={`flex items-center gap-2 rounded-xl border px-3 py-3 text-left text-sm font-medium transition ${
              s === lead.status ? "border-forest bg-forest/5 text-forest" : "border-border hover:border-forest"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${STATUS_STYLES[s].dot}`} /> {s}
            {s === lead.status && <Icon name="check" className="ml-auto h-4 w-4" />}
          </button>
        ))}
      </div>
    </Modal>
  );
}
