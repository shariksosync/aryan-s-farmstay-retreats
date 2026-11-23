import SafeImage from "./SafeImage.jsx";
import Icon from "./Icons.jsx";
import { PROPERTIES } from "../data/mockData.js";

export default function PropertyCards({ onViewDetails, onEnquire }) {
  return (
    <section id="farmhouses" className="relative bg-beige/45 py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Our Farmhouses</span>
          <h2 className="display-lg mt-5">Two flagship estates, one warm welcome</h2>
          <p className="mt-5 text-ink/75">
            Private pool villas and agro-tourism retreats on the edge of Pune — reserved entirely for you and your guests.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          {PROPERTIES.map((p, i) => (
            <article key={p.id} className="card-lift group flex flex-col overflow-hidden rounded-[2rem] bg-card shadow-soft">
              <button onClick={() => onViewDetails(p)} className="img-zoom relative block text-left" aria-label={`View details of ${p.name}`}>
                <SafeImage src={p.image} alt={p.name} className="aspect-[16/11]" />
                <div className="card-overlay absolute inset-0" />
                <span className="absolute left-5 top-5 rounded-full bg-cream/95 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-forest">
                  Flagship 0{i + 1}
                </span>
                <div className="absolute inset-x-6 bottom-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{p.tagline}</p>
                  <h3 className="mt-2 font-display text-4xl font-semibold text-ivory sm:text-[2.6rem]">{p.name}</h3>
                </div>
              </button>

              <div className="flex flex-1 flex-col p-7 sm:p-9">
                <p className="leading-relaxed text-ink/80">{p.description}</p>

                <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3">
                  {p.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2.5 text-sm text-deep">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-beige text-forest">
                        <Icon name={f.icon} className="h-[1.1rem] w-[1.1rem]" />
                      </span>
                      <span className="leading-tight">{f.label}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-3 pt-9 sm:flex-row">
                  <button onClick={() => onViewDetails(p)} className="btn btn-outline flex-1">
                    View Details
                  </button>
                  <button onClick={() => onEnquire(p.id)} className="btn btn-gold flex-1">
                    Enquire About This Property
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
