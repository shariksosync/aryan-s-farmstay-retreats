import { useEffect, useState } from "react";
import Icon from "../components/Icons.jsx";
import Modal from "../components/Modal.jsx";
import SafeImage from "../components/SafeImage.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { FormField, Toggle } from "../components/admin/FormControls.jsx";
import { useApp } from "../store/AppStore.jsx";
import { EXPERIENCE_TYPES } from "../data/mockData.js";

const EMPTY = { title: "", description: "", image: "", enquiryType: "Other", visible: true };

export default function ExperienceManagement() {
  const { experiences, addExperience, updateExperience, deleteExperience, toast } = useApp();
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const visibleCount = experiences.filter((e) => e.visible).length;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          <strong className="text-deep">{experiences.length}</strong> experiences · <strong className="text-deep">{visibleCount}</strong> visible on the website
        </p>
        <button className="btn btn-sm btn-forest" onClick={() => setEditing({ ...EMPTY, __new: true })}>
          <Icon name="plus" className="h-4 w-4" /> Add experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="admin-card p-12 text-center text-sm text-muted-foreground">No experiences yet. Add your first one.</div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {experiences.map((x) => (
            <article key={x.id} className={`admin-card overflow-hidden transition ${x.visible ? "" : "opacity-60"}`}>
              <div className="relative">
                <SafeImage src={x.image} alt={x.title} className="aspect-[16/10]" />
                <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.68rem] font-semibold ${x.visible ? "bg-forest text-ivory" : "bg-card text-muted-foreground"}`}>
                  {x.visible ? "Visible" : "Hidden"}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl font-semibold text-deep">{x.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{x.description}</p>
                <p className="mt-3 text-[0.7rem] uppercase tracking-wider text-olive">Enquiry type: {x.enquiryType}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Toggle size="sm" checked={x.visible} label={`Toggle visibility of ${x.title}`} onChange={(v) => { updateExperience(x.id, { visible: v }); toast(`${x.title} is now ${v ? "visible" : "hidden"}.`); }} />
                    Show on website
                  </span>
                  <span className="flex gap-1">
                    <button className="icon-btn" aria-label={`Edit ${x.title}`} onClick={() => setEditing(x)}><Icon name="edit" className="h-4 w-4" /></button>
                    <button className="icon-btn icon-btn-danger" aria-label={`Delete ${x.title}`} onClick={() => setDeleting(x)}><Icon name="trash" className="h-4 w-4" /></button>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <ExperienceForm
        item={editing}
        onClose={() => setEditing(null)}
        onSave={(data) => {
          if (editing.__new) { addExperience(data); toast(`Experience "${data.title}" added.`); }
          else { updateExperience(editing.id, data); toast(`Experience "${data.title}" updated.`); }
          setEditing(null);
        }}
      />
      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete experience?"
        message={deleting ? `"${deleting.title}" will be removed from the website.` : ""}
        onClose={() => setDeleting(null)}
        onConfirm={() => { deleteExperience(deleting.id); toast(`"${deleting.title}" deleted.`); }}
      />
    </div>
  );
}

function ExperienceForm({ item, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  useEffect(() => { if (item) { setForm({ ...EMPTY, ...item }); setErrors({}); } }, [item]);
  if (!item) return null;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const { __new, id, ...data } = form;
    onSave({ ...data, title: data.title.trim(), description: data.description.trim(), image: data.image.trim() });
  };
  return (
    <Modal
      open
      onClose={onClose}
      title={item.__new ? "Add experience" : "Edit experience"}
      footer={<><button className="btn btn-sm btn-quiet" onClick={onClose}>Cancel</button><button type="submit" form="exp-form" className="btn btn-sm btn-forest"><Icon name="check" className="h-4 w-4" /> Save</button></>}
    >
      <form id="exp-form" onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
        <FormField label="Title" error={errors.title} className="sm:col-span-2"><input className="field" value={form.title} onChange={set("title")} placeholder="e.g. Sunset Bonfire Nights" /></FormField>
        <FormField label="Description" error={errors.description} className="sm:col-span-2"><textarea rows={3} className="field resize-none" value={form.description} onChange={set("description")} /></FormField>
        <FormField label="Image URL" hint="Paste any public image URL, or a path like /images/pool-party.jpg" className="sm:col-span-2"><input className="field" value={form.image} onChange={set("image")} placeholder="https://…" /></FormField>
        <FormField label="Linked enquiry type" hint="Pre-selected when visitors click this card.">
          <select className="field" value={form.enquiryType} onChange={set("enquiryType")}>
            {EXPERIENCE_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </FormField>
        <div className="flex items-center gap-3 pt-6">
          <Toggle checked={form.visible} label="Visible on website" onChange={(v) => setForm((f) => ({ ...f, visible: v }))} />
          <span className="text-sm text-ink">Visible on website</span>
        </div>
        <SafeImage src={form.image} alt="Preview" className="aspect-[16/7] rounded-xl sm:col-span-2" />
      </form>
    </Modal>
  );
}
