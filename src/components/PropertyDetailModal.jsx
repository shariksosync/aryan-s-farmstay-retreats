import { useEffect, useState } from "react";
import Modal from "./Modal.jsx";
import SafeImage from "./SafeImage.jsx";
import Icon from "./Icons.jsx";
import EnquiryForm from "./EnquiryForm.jsx";
import { useApp } from "../store/AppStore.jsx";

export default function PropertyDetailModal({ property, onClose }) {
  const { contact } = useApp();
  const [active, setActive] = useState(0);
  useEffect(() => setActive(0), [property?.id]);
  if (!property) return null;
  const images = property.gallery;

  return (
    <Modal open={Boolean(property)} onClose={onClose} size="xl" bare title={property.name}>
      <div className="relative">
        <SafeImage src={images[active]} alt={property.name} className="aspect-[16/9] sm:aspect-[21/9]" loading="eager" />
        <div className="card-overlay absolute inset-0" />
        <div className="absolute inset-x-6 bottom-6 sm:inset-x-10 sm:bottom-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{property.tagline}</p>
          <h2 className="mt-2 font-display text-4xl font-semibold text-ivory sm:text-6xl">{property.name}</h2>
        </div>
      </div>
      <div className="flex gap-3 overflow-x-auto bg-deep px-6 py-4 sm:px-10">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setActive(i)}
            className={`shrink-0 overflow-hidden rounded-xl ring-2 transition ${i === active ? "ring-gold" : "ring-transparent opacity-60 hover:opacity-100"}`}
            aria-label={`Show image ${i + 1}`}
          >
            <SafeImage src={src} alt="" className="h-16 w-24 sm:h-20 sm:w-32" />
          </button>
        ))}
      </div>

      <div className="grid gap-10 px-6 py-10 sm:px-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="eyebrow">About the property</span>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink/85">{property.longDescription}</p>

          <h4 className="mt-9 font-display text-2xl font-semibold text-deep">Perfect for</h4>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {property.features.map((f) => (
              <li key={f.label} className="flex items-center gap-2.5 rounded-xl bg-beige/60 px-3 py-3 text-sm text-deep">
                <Icon name={f.icon} className="h-[1.1rem] w-[1.1rem] shrink-0 text-forest" /> {f.label}
              </li>
            ))}
          </ul>

          <dl className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {property.highlights.map((h) => (
              <div key={h.label} className="bg-card px-5 py-4">
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-olive">{h.label}</dt>
                <dd className="mt-1 font-medium text-deep">{h.value}</dd>
              </div>
            ))}
          </dl>

          <h4 className="mt-9 font-display text-2xl font-semibold text-deep">Amenities</h4>
          <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {property.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2.5 text-sm text-ink/85">
                <Icon name="check" className="h-4 w-4 text-gold-dark" strokeWidth={2.2} /> {a}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href={`tel:+91${contact.phone1}`} className="btn btn-outline btn-sm"><Icon name="phone" className="h-4 w-4" /> {contact.phone1}</a>
            <a
              href={`https://wa.me/91${contact.whatsapp}?text=${encodeURIComponent(`Hi, I'd like to enquire about ${property.name}.`)}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-forest btn-sm"
            >
              <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp us
            </a>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-border bg-cream p-6 sm:p-8 lg:sticky lg:top-6 lg:self-start">
          <h4 className="font-display text-3xl font-semibold text-deep">Enquire about this property</h4>
          <p className="mb-6 mt-1 text-sm text-muted-foreground">Share a few details and we'll call you back.</p>
          <EnquiryForm fixedProperty={property.id} dense />
        </div>
      </div>
    </Modal>
  );
}
