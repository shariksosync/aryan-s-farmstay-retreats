import { useEffect, useState } from "react";
import Icon from "../components/Icons.jsx";
import { FormField, SectionCard } from "../components/admin/FormControls.jsx";
import { useApp } from "../store/AppStore.jsx";
import { normalizePhone } from "../lib/leads.js";

export default function ContactManagement() {
  const { contact, setContact, toast } = useApp();
  const [form, setForm] = useState(contact);
  const [errors, setErrors] = useState({});
  useEffect(() => setForm(contact), [contact]);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const dirty = JSON.stringify(form) !== JSON.stringify(contact);

  const save = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.businessName.trim()) errs.businessName = "Business name is required.";
    if (!/^[6-9]\d{9}$/.test(normalizePhone(form.phone1))) errs.phone1 = "Enter a valid 10-digit number.";
    if (form.phone2 && !/^[6-9]\d{9}$/.test(normalizePhone(form.phone2))) errs.phone2 = "Enter a valid 10-digit number.";
    if (!/^[6-9]\d{9}$/.test(normalizePhone(form.whatsapp))) errs.whatsapp = "Enter a valid 10-digit WhatsApp number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.address.trim()) errs.address = "Address is required.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setContact({
      ...form,
      businessName: form.businessName.trim(),
      phone1: normalizePhone(form.phone1),
      phone2: form.phone2 ? normalizePhone(form.phone2) : "",
      whatsapp: normalizePhone(form.whatsapp),
      email: form.email.trim(),
      address: form.address.trim(),
    });
    toast("Contact information updated across the website.");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
      <SectionCard title="Business contact details" description="Shown in the header, contact section, property pages and footer">
        <form onSubmit={save} noValidate className="grid gap-4 sm:grid-cols-2">
          <FormField label="Business name" error={errors.businessName} className="sm:col-span-2"><input className="field" value={form.businessName} onChange={set("businessName")} /></FormField>
          <FormField label="Contact number 1" error={errors.phone1}><input className="field" value={form.phone1} onChange={set("phone1")} inputMode="tel" /></FormField>
          <FormField label="Contact number 2" error={errors.phone2}><input className="field" value={form.phone2} onChange={set("phone2")} inputMode="tel" /></FormField>
          <FormField label="Email address" error={errors.email}><input className="field" value={form.email} onChange={set("email")} /></FormField>
          <FormField label="WhatsApp number" error={errors.whatsapp} hint="Used for all WhatsApp enquiry buttons"><input className="field" value={form.whatsapp} onChange={set("whatsapp")} inputMode="tel" /></FormField>
          <FormField label="Business address" error={errors.address} className="sm:col-span-2"><textarea rows={3} className="field resize-none" value={form.address} onChange={set("address")} /></FormField>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <button type="button" className="btn btn-sm btn-quiet" disabled={!dirty} onClick={() => { setForm(contact); setErrors({}); }}>Discard</button>
            <button type="submit" className="btn btn-sm btn-forest" disabled={!dirty}><Icon name="check" className="h-4 w-4" /> Save changes</button>
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Live preview" description="How visitors will see it">
        <div className="rounded-2xl bg-forest p-6 text-ivory">
          <p className="font-display text-2xl font-semibold">{form.businessName || "—"}</p>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3"><Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <span className="text-ivory/85">{form.address}</span></li>
            <li className="flex gap-3"><Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <span>{form.phone1}{form.phone2 && ` / ${form.phone2}`}</span></li>
            <li className="flex gap-3"><Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <span className="break-all">{form.email}</span></li>
            <li className="flex gap-3"><Icon name="whatsapp" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <span>wa.me/91{normalizePhone(form.whatsapp)}</span></li>
          </ul>
        </div>
      </SectionCard>
    </div>
  );
}
