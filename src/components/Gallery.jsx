import { useCallback, useEffect, useMemo, useState } from "react";
import SafeImage from "./SafeImage.jsx";
import Icon from "./Icons.jsx";
import { useApp } from "../store/AppStore.jsx";
import { GALLERY_CATEGORIES } from "../data/mockData.js";

export default function Gallery() {
  const { gallery, content } = useApp();
  const [cat, setCat] = useState("All");
  const [index, setIndex] = useState(-1);

  const items = useMemo(
    () => gallery.filter((g) => g.visible && (cat === "All" || g.category === cat)),
    [gallery, cat],
  );

  const close = useCallback(() => setIndex(-1), []);
  const step = useCallback((d) => setIndex((i) => (i + d + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (index < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  if (!content.galleryEnabled) return null;
  const current = items[index];

  return (
    <section id="gallery" className="bg-beige/45 py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Gallery</span>
          <h2 className="display-lg mt-5">A glimpse of life at the farm</h2>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist">
          {["All", ...GALLERY_CATEGORIES].map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                cat === c ? "border-forest bg-forest text-ivory" : "border-border bg-card text-ink hover:border-forest hover:text-forest"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {items.length === 0 ? (
          <p className="mt-12 text-center text-muted-foreground">No photos in this category yet.</p>
        ) : (
          <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {items.map((g, i) => (
              <button key={g.id} onClick={() => setIndex(i)} className="img-zoom group relative block w-full break-inside-avoid overflow-hidden rounded-[1.4rem]">
                <SafeImage src={g.url} alt={g.title} className={i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-[4/3]" : "aspect-square"} />
                <div className="card-overlay absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-5 bottom-4 flex items-end justify-between text-left opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">{g.category}</p>
                    <p className="font-display text-xl text-ivory">{g.title}</p>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-ivory/20 text-ivory backdrop-blur"><Icon name="plus" className="h-4 w-4" /></span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {current && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-deep/95 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={current.title} onClick={close}>
          <button onClick={close} aria-label="Close preview" className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20">
            <Icon name="x" />
          </button>
          {items.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous image" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 sm:left-6">
                <Icon name="chevronLeft" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next image" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 sm:right-6">
                <Icon name="chevronRight" />
              </button>
            </>
          )}
          <figure className="max-w-5xl animate-in fade-in zoom-in-95" onClick={(e) => e.stopPropagation()}>
            <SafeImage src={current.url} alt={current.title} className="max-h-[78vh] rounded-2xl" imgClassName="max-h-[78vh] w-auto object-contain" loading="eager" />
            <figcaption className="mt-4 flex items-center justify-between text-ivory">
              <span className="font-display text-2xl">{current.title}</span>
              <span className="text-xs uppercase tracking-[0.2em] text-gold">{current.category} · {index + 1}/{items.length}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
