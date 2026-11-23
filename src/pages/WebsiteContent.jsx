import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import Icon from "../components/Icons.jsx";
import SafeImage from "../components/SafeImage.jsx";
import { FormField, SectionCard } from "../components/admin/FormControls.jsx";
import { useApp } from "../store/AppStore.jsx";
import { initialContent } from "../data/mockData.js";

export default function WebsiteContent() {
  const { content, setContent, toast } = useApp();
  const [draft, setDraft] = useState(content);
  useEffect(() => setDraft(content), [content]);
  const dirty = JSON.stringify(draft) !== JSON.stringify(content);
  const set = (k) => (e) => setDraft((d) => ({ ...d, [k]: e.target.value }));
  const setWhy = (i, k) => (e) => setDraft((d) => ({ ...d, whyItems: d.whyItems.map((w, j) => (j === i ? { ...w, [k]: e.target.value } : w)) }));

  const save = () => {
    if (!draft.heroHeading.trim() || !draft.aboutHeading.trim()) {
      toast("Hero and About headings cannot be empty.", "error");
      return;
    }
    setContent(draft);
    toast("Website content updated — changes are live.");
  };

  return (
    <div className="space-y-6 pb-24">
      <SectionCard title="Hero banner" description="The first thing visitors see">
        <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <div className="grid gap-4">
            <FormField label="Hero heading" hint="Text after the first full stop is shown in gold."><input className="field" value={draft.heroHeading} onChange={set("heroHeading")} /></FormField>
            <FormField label="Hero subtitle"><textarea rows={3} className="field resize-none" value={draft.heroSubtitle} onChange={set("heroSubtitle")} /></FormField>
            <FormField label="Hero banner image URL"><input className="field" value={draft.heroImage} onChange={set("heroImage")} /></FormField>
          </div>
          <div className="relative overflow-hidden rounded-2xl">
            <SafeImage src={draft.heroImage} alt="Hero preview" className="aspect-[4/3] h-full" />
            <div className="hero-overlay absolute inset-0" />
            <div className="absolute inset-x-5 bottom-5">
              <p className="font-display text-2xl leading-tight text-ivory">{draft.heroHeading}</p>
              <p className="mt-1 line-clamp-2 text-xs text-ivory/80">{draft.heroSubtitle}</p>
            </div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="About Us" description="Story section below the banner">
        <div className="grid gap-4">
          <FormField label="About heading"><input className="field" value={draft.aboutHeading} onChange={set("aboutHeading")} /></FormField>
          <FormField label="About description"><textarea rows={4} className="field resize-none" value={draft.aboutDescription} onChange={set("aboutDescription")} /></FormField>
        </div>
      </SectionCard>

      <SectionCard title="Why Choose Us" description="Six benefit cards on the dark green section">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Section heading"><input className="field" value={draft.whyHeading} onChange={set("whyHeading")} /></FormField>
          <FormField label="Section subtitle"><input className="field" value={draft.whySubtitle} onChange={set("whySubtitle")} /></FormField>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {draft.whyItems.map((w, i) => (
            <div key={i} className="rounded-xl border border-border bg-cream/60 p-4">
              <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-wider text-olive">Benefit {i + 1}</p>
              <input className="field mb-2" value={w.title} onChange={setWhy(i, "title")} aria-label={`Benefit ${i + 1} title`} />
              <textarea rows={2} className="field resize-none" value={w.description} onChange={setWhy(i, "description")} aria-label={`Benefit ${i + 1} description`} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Footer" description="Short business description in the footer">
        <FormField label="Footer description"><textarea rows={3} className="field resize-none" value={draft.footerDescription} onChange={set("footerDescription")} /></FormField>
      </SectionCard>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur lg:left-72">
        <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-8">
          <span className={`text-xs font-medium ${dirty ? "text-status-followup" : "text-muted-foreground"}`}>{dirty ? "● Unsaved changes" : "All changes saved"}</span>
          <button className="btn btn-sm btn-quiet ml-auto" onClick={() => setDraft({ ...initialContent, galleryEnabled: content.galleryEnabled })}><Icon name="refresh" className="h-4 w-4" /> Restore defaults</button>
          <button className="btn btn-sm btn-quiet" disabled={!dirty} onClick={() => setDraft(content)}>Discard</button>
          <Link to="/" className="btn btn-sm btn-quiet hidden sm:inline-flex"><Icon name="external" className="h-4 w-4" /> Preview site</Link>
          <button className="btn btn-sm btn-forest" disabled={!dirty} onClick={save}><Icon name="check" className="h-4 w-4" /> Save & publish</button>
        </div>
      </div>
    </div>
  );
}
