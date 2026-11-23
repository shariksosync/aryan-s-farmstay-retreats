import Icon from "./Icons.jsx";
import EnquiryForm from "./EnquiryForm.jsx";
import { useApp } from "../store/AppStore.jsx";

export default function Contact({ prefill }) {
  const { contact } = useApp();
  const wa = `https://wa.me/91${contact.whatsapp}?text=${encodeURIComponent("Hi Aryan's Farmstays, I'd like to enquire about a farmhouse booking.")}`;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`;

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Enquiry & Contact</span>
          <h2 className="display-lg mt-5">Plan Your Perfect Farmhouse Experience</h2>
          <p className="mt-5 text-ink/75">Tell us your date and group size — we'll help you choose the right farmhouse and plan every detail.</p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-5">
            <div className="rounded-[1.75rem] bg-forest p-8 text-ivory">
              <h3 className="font-display text-3xl font-semibold">{contact.businessName}</h3>
              <ul className="mt-7 space-y-6 text-sm">
                <li className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ivory/10 text-gold"><Icon name="mapPin" className="h-[1.1rem] w-[1.1rem]" /></span>
                  <span className="leading-relaxed text-ivory/85">{contact.address}</span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ivory/10 text-gold"><Icon name="phone" className="h-[1.1rem] w-[1.1rem]" /></span>
                  <span className="flex flex-col gap-1">
                    <a href={`tel:+91${contact.phone1}`} className="text-base font-medium hover:text-gold">+91 {contact.phone1}</a>
                    {contact.phone2 && <a href={`tel:+91${contact.phone2}`} className="text-base font-medium hover:text-gold">+91 {contact.phone2}</a>}
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ivory/10 text-gold"><Icon name="mail" className="h-[1.1rem] w-[1.1rem]" /></span>
                  <a href={`mailto:${contact.email}`} className="self-center break-all text-base font-medium hover:text-gold">{contact.email}</a>
                </li>
              </ul>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a href={wa} target="_blank" rel="noreferrer" className="btn btn-gold"><Icon name="whatsapp" className="h-4 w-4" /> WhatsApp</a>
                <a href={`tel:+91${contact.phone1}`} className="btn btn-glass"><Icon name="phone" className="h-4 w-4" /> Call now</a>
              </div>
            </div>

            <a href={maps} target="_blank" rel="noreferrer" className="group relative block min-h-[260px] flex-1 overflow-hidden rounded-[1.75rem] border border-border bg-beige" aria-label="Open location in Google Maps">
              <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <rect width="400" height="260" fill="var(--beige)" />
                <path d="M0 180 C80 160 120 200 200 170 S330 120 400 140" stroke="var(--olive)" strokeOpacity=".35" strokeWidth="26" fill="none" />
                <path d="M-10 60 L410 110" stroke="var(--card)" strokeWidth="10" />
                <path d="M120 -10 L180 270" stroke="var(--card)" strokeWidth="8" />
                <path d="M260 -10 C250 80 300 160 290 270" stroke="var(--card)" strokeWidth="6" />
                <path d="M-10 220 L410 200" stroke="var(--card)" strokeWidth="5" />
                <g fill="var(--olive)" fillOpacity=".25">
                  <circle cx="60" cy="110" r="18" /><circle cx="340" cy="60" r="22" /><circle cx="330" cy="210" r="16" /><circle cx="70" cy="230" r="12" />
                </g>
              </svg>
              <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-full text-center">
                <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-forest text-gold shadow-lift transition-transform group-hover:-translate-y-1">
                  <Icon name="mapPin" className="h-6 w-6" />
                  <span className="absolute inset-0 animate-ping rounded-full bg-forest/30" />
                </span>
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl bg-card/95 px-5 py-4 shadow-soft backdrop-blur">
                <span>
                  <span className="block text-sm font-semibold text-deep">Mundhwa – Manjari Road, Pune</span>
                  <span className="block text-xs text-muted-foreground">Map preview · tap for directions</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-forest">Directions <Icon name="external" className="h-3.5 w-3.5" /></span>
              </div>
            </a>
          </div>

          <div id="enquiry" className="scroll-mt-24 rounded-[1.75rem] border border-border bg-card p-6 shadow-soft sm:p-10">
            <h3 className="font-display text-3xl font-semibold text-deep">Send an enquiry</h3>
            <p className="mb-8 mt-1 text-sm text-muted-foreground">Fields marked * are required.</p>
            <EnquiryForm prefill={prefill} />
          </div>
        </div>
      </div>
    </section>
  );
}
