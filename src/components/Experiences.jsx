import SafeImage from "./SafeImage.jsx";
import Icon from "./Icons.jsx";
import { useApp } from "../store/AppStore.jsx";

export default function Experiences({ onEnquire }) {
  const { experiences } = useApp();
  const visible = experiences.filter((e) => e.visible);
  return (
    <section id="experiences" className="py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">Experiences</span>
            <h2 className="display-lg mt-5">Moments made for the countryside</h2>
          </div>
          <p className="max-w-md text-ink/75">
            From lazy picnics to lively pool parties — pick your occasion and we'll shape the day around it.
          </p>
        </div>

        {visible.length === 0 ? (
          <p className="mt-14 rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">New experiences are coming soon.</p>
        ) : (
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((x, i) => (
              <button
                key={x.id}
                onClick={() => onEnquire(x.enquiryType || "Other")}
                className={`img-zoom group relative overflow-hidden rounded-[1.6rem] text-left ${i % 4 === 1 || i % 4 === 2 ? "lg:translate-y-8" : ""}`}
              >
                <SafeImage src={x.image} alt={x.title} className="aspect-[3/4]" />
                <div className="card-overlay absolute inset-0 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-x-5 bottom-5">
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">0{i + 1}</span>
                  <h3 className="mt-1.5 font-display text-[1.75rem] font-semibold leading-tight text-ivory">{x.title}</h3>
                  <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-ivory/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                    {x.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-ivory/90">
                    Enquire <Icon name="arrowRight" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
