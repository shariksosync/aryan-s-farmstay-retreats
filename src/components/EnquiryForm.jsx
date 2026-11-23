import { useEffect, useMemo, useState } from "react";
import Icon from "./Icons.jsx";
import { useApp } from "../store/AppStore.jsx";
import { EXPERIENCE_TYPES, PROPERTIES } from "../data/mockData.js";
import { propertyName, validateEnquiry } from "../lib/leads.js";

const EMPTY = {
  customerName: "",
  phone: "",
  email: "",
  property: "",
  experience: "",
  visitDate: "",
  guests: "",
  message: "",
};

function Field({ label, error, required, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="field-label">
        {label} {required ? <span className="text-gold-dark">*</span> : <span className="font-normal text-muted-foreground">(optional)</span>}
      </span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-destructive">{error}</span>}
    </label>
  );
}

/**
 * Public enquiry form. Creates a lead in shared state, auto-tagged to the chosen farmhouse.
 * - fixedProperty: lock the farmhouse (used in the property detail view)
 * - prefill: { property, experience, token } — token changes re-apply the prefill
 */
export default function EnquiryForm({ fixedProperty, prefill, dense = false }) {
  const { addEnquiry, toast } = useApp();
  const [form, setForm] = useState({ ...EMPTY, property: fixedProperty || "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);
  const [busy, setBusy] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    const d = new Date();
    setToday(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    if (!prefill?.token) return;
    setSubmitted(null);
    setForm((f) => ({
      ...f,
      property: fixedProperty || prefill.property || f.property,
      experience: prefill.experience || f.experience,
    }));
  }, [prefill?.token, prefill?.property, prefill?.experience, fixedProperty]);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const errs = validateEnquiry(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast("Please fill in the highlighted fields.", "error");
      return;
    }
    setBusy(true);
    setTimeout(() => {
      const created = addEnquiry(form);
      setSubmitted(created);
      setBusy(false);
      setForm({ ...EMPTY, property: fixedProperty || "" });
      toast(`Thank you, ${created.customerName.split(" ")[0]}! Enquiry ${created.id} for ${propertyName(created.property)} has been received.`);
    }, 450);
  };

  const cols = dense ? "sm:grid-cols-2" : "sm:grid-cols-2";
  const propertyOptions = useMemo(() => PROPERTIES.map((p) => ({ value: p.id, label: p.name })), []);

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-beige/60 px-6 py-12 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-forest text-ivory">
          <Icon name="check" className="h-8 w-8" strokeWidth={2} />
        </span>
        <h3 className="mt-6 font-display text-3xl font-semibold text-deep">Enquiry received</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/80">
          Your reference ID is <strong className="text-forest">{submitted.id}</strong> for{" "}
          <strong>{propertyName(submitted.property)}</strong>. Our team will call you on {submitted.phone} shortly.
        </p>
        <button className="btn btn-outline btn-sm mt-7" onClick={() => setSubmitted(null)}>
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={`grid gap-4 ${cols}`}>
      <Field label="Full Name" required error={errors.customerName}>
        <input className={`field ${errors.customerName ? "field-error" : ""}`} value={form.customerName} onChange={set("customerName")} placeholder="e.g. Rahul Sharma" autoComplete="name" />
      </Field>
      <Field label="Mobile Number" required error={errors.phone}>
        <input className={`field ${errors.phone ? "field-error" : ""}`} value={form.phone} onChange={set("phone")} placeholder="10-digit mobile" inputMode="tel" autoComplete="tel" maxLength={14} />
      </Field>
      <Field label="Email Address" error={errors.email} className="sm:col-span-2">
        <input type="email" className={`field ${errors.email ? "field-error" : ""}`} value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" />
      </Field>
      <Field label="Select Farmhouse" required error={errors.property}>
        <select className={`field ${errors.property ? "field-error" : ""}`} value={form.property} onChange={set("property")} disabled={Boolean(fixedProperty)}>
          <option value="">Choose a farmhouse</option>
          {propertyOptions.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </Field>
      <Field label="Experience Type" required error={errors.experience}>
        <select className={`field ${errors.experience ? "field-error" : ""}`} value={form.experience} onChange={set("experience")}>
          <option value="">Choose an experience</option>
          {EXPERIENCE_TYPES.map((x) => (
            <option key={x} value={x}>{x}</option>
          ))}
        </select>
      </Field>
      <Field label="Expected Visit Date" required error={errors.visitDate}>
        <input type="date" min={today || undefined} className={`field ${errors.visitDate ? "field-error" : ""}`} value={form.visitDate} onChange={set("visitDate")} />
      </Field>
      <Field label="Number of Guests" required error={errors.guests}>
        <input type="number" min="1" max="500" className={`field ${errors.guests ? "field-error" : ""}`} value={form.guests} onChange={set("guests")} placeholder="e.g. 20" />
      </Field>
      <Field label="Message" className="sm:col-span-2">
        <textarea rows={dense ? 3 : 4} className="field resize-none" value={form.message} onChange={set("message")} placeholder="Tell us about your plans — meals, decorations, timings…" />
      </Field>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">We usually respond within a few hours.</p>
        <button type="submit" disabled={busy} className="btn btn-forest">
          {busy ? "Submitting…" : "Submit Enquiry"} {!busy && <Icon name="arrowRight" className="h-4 w-4" />}
        </button>
      </div>
    </form>
  );
}
