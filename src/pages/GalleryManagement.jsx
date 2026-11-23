import { useEffect, useState } from "react";
import Icon from "../components/Icons.jsx";
import Modal from "../components/Modal.jsx";
import SafeImage from "../components/SafeImage.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import { FormField, Toggle } from "../components/admin/FormControls.jsx";
import { useApp } from "../store/AppStore.jsx";
import { GALLERY_CATEGORIES } from "../data/mockData.js";

const EMPTY = { title: "", category: "Farmhouses", url: "", visible: true };

export default function GalleryManagement() {
  const { gallery, addImage, updateImage, deleteImage, content, setContent, toast } = useApp();
  const [cat, setCat] = useState("All");
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const list = gallery.filter((g) => cat === "All" || g.category === cat);

  return (
    <div className="space-y-5">
      <div className="admin-card flex flex-wrap items-center justify-between gap-4 p-5">
        <div className="flex items-center gap-4">
          <Toggle checked={content.galleryEnabled} label="Show gallery section" onChange={(v) => { setContent({ galleryEnabled: v }); toast(`Gallery section ${v ? "enabled" : "hidden"} on the website.`); }} />
          <div>
            <p className="text-sm font-semibold text-deep">Gallery section on website</p>
            <p className="text-xs text-muted-foreground">{content.galleryEnabled ? "Visible to visitors" : "Hidden from visitors and the menu"}</p>
          </div>
        </div>
        <button className="btn btn-sm btn-forest" onClick={() => setEditing({ ...EMPTY, __new: true })}><Icon name="plus" className="h-4 w-4" /> Add image</button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {["All", ...GALLERY_CATEGORIES].map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition ${cat === c ? "border-forest bg-forest text-ivory" : "border-border bg-card text-ink hover:border-forest"}`}>
            {c} · {c === "All" ? gallery.length : gallery.filter((g) => g.category === c).length}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="admin-card p-12 text-center text-sm text-muted-foreground">No images in this category.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {list.map((g) => (
            <article key={g.id} className={`admin-card overflow-hidden ${g.visible ? "" : "opacity-60"}`}>
              <div className="relative">
                <SafeImage src={g.url} alt={g.title} className="aspect-[4/3]" />
                <span className="absolute left-3 top-3 rounded-full bg-card/95 px-2.5 py-1 text-[0.68rem] font-semibold text-forest">{g.category}</span>
              </div>
              <div className="flex items-center gap-3 p-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-deep">{g.title}</p>
                  <p className="text-xs text-muted-foreground">{g.visible ? "Visible" : "Hidden"}</p>
                </div>
                <Toggle size="sm" checked={g.visible} label={`Toggle ${g.title}`} onChange={(v) => updateImage(g.id, { visible: v })} />
                <button className="icon-btn" aria-label={`Edit ${g.title}`} onClick={() => setEditing(g)}><Icon name="edit" className="h-4 w-4" /></button>
                <button className="icon-btn icon-btn-danger" aria-label={`Delete ${g.title}`} onClick={() => setDeleting(g)}><Icon name="trash" className="h-4 w-4" /></button>
              </div>
            </article>
          ))}
        </div>
      )}

      <ImageForm
        item={editing}
        onClose={() => setEditing(null)}
        onSave={(data) => {
          if (editing.__new) { addImage(data); toast(`Image "${data.title}" added to ${data.category}.`); }
          else { updateImage(editing.id, data); toast(`Image "${data.title}" updated.`); }
          setEditing(null);
        }}
      />
      <ConfirmDialog
        open={Boolean(deleting)}
        title="Delete image?"
        message={deleting ? `"${deleting.title}" will be removed from the gallery.` : ""}
        onClose={() => setDeleting(null)}
        onConfirm={() => { deleteImage(deleting.id); toast(`"${deleting.title}" deleted.`); }}
      />
    </div>
  );
}

function ImageForm({ item, onClose, onSave }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  useEffect(() => { if (item) { setForm({ ...EMPTY, ...item }); setErrors({}); } }, [item]);
  if (!item) return null;
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.url.trim()) errs.url = "Image URL is required.";
    else if (!/^(https?:\/\/|\/)/.test(form.url.trim())) errs.url = "URL must start with http(s):// or /";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const { __new, id, ...data } = form;
    onSave({ ...data, title: data.title.trim(), url: data.url.trim() });
  };
  return (
    <Modal
      open
      onClose={onClose}
      title={item.__new ? "Add gallery image" : "Edit gallery image"}
      footer={<><button className="btn btn-sm btn-quiet" onClick={onClose}>Cancel</button><button type="submit" form="img-form" className="btn btn-sm btn-forest"><Icon name="check" className="h-4 w-4" /> Save</button></>}
    >
      <form id="img-form" onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
        <FormField label="Image URL" error={errors.url} className="sm:col-span-2"><input className="field" value={form.url} onChange={set("url")} placeholder="https://images.example.com/farm.jpg" /></FormField>
        <FormField label="Title" error={errors.title}><input className="field" value={form.title} onChange={set("title")} /></FormField>
        <FormField label="Category">
          <select className="field" value={form.category} onChange={set("category")}>
            {GALLERY_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </FormField>
        <div className="flex items-center gap-3 sm:col-span-2">
          <Toggle checked={form.visible} label="Visible" onChange={(v) => setForm((f) => ({ ...f, visible: v }))} />
          <span className="text-sm text-ink">Visible in website gallery</span>
        </div>
        <SafeImage src={form.url} alt="Preview" className="aspect-[16/8] rounded-xl sm:col-span-2" />
      </form>
    </Modal>
  );
}
