import { Link } from "@tanstack/react-router";
import Logo from "./Logo.jsx";
import Icon from "./Icons.jsx";
import { NAV_ITEMS, scrollToSection } from "./Header.jsx";
import { PROPERTIES } from "../data/mockData.js";
import { useApp } from "../store/AppStore.jsx";

const SOCIALS = [
  { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
  { icon: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
  { icon: "youtube", label: "YouTube", href: "https://www.youtube.com/" },
];

export default function Footer({ onOpenProperty }) {
  const { content, contact } = useApp();
  return (
    <footer className="relative overflow-hidden bg-deep text-ivory">
      <div className="grain absolute inset-0 opacity-50" />
      <div className="container-x relative grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">{content.footerDescription}</p>
          <div className="mt-7 flex gap-3">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full border border-ivory/20 text-ivory/80 transition hover:border-gold hover:bg-gold hover:text-deep">
                <Icon name={s.icon} className="h-[1.1rem] w-[1.1rem]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Quick Links</h4>
          <ul className="mt-6 space-y-3 text-sm">
            {NAV_ITEMS.filter((i) => i.id !== "gallery" || content.galleryEnabled).map((i) => (
              <li key={i.id}>
                <button onClick={() => scrollToSection(i.id)} className="text-ivory/75 transition hover:text-gold">{i.label}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Our Farmhouses</h4>
          <ul className="mt-6 space-y-3 text-sm">
            {PROPERTIES.map((p) => (
              <li key={p.id}>
                <button onClick={() => onOpenProperty(p)} className="text-ivory/75 transition hover:text-gold">{p.name}</button>
              </li>
            ))}
            <li>
              <button onClick={() => scrollToSection("enquiry")} className="text-ivory/75 transition hover:text-gold">Book a visit</button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">Contact</h4>
          <ul className="mt-6 space-y-4 text-sm text-ivory/75">
            <li className="flex gap-3"><Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <span className="leading-relaxed">{contact.address}</span></li>
            <li className="flex gap-3">
              <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <a href={`tel:+91${contact.phone1}`} className="hover:text-gold">{contact.phone1}</a>
                {contact.phone2 && <> / <a href={`tel:+91${contact.phone2}`} className="hover:text-gold">{contact.phone2}</a></>}
              </span>
            </li>
            <li className="flex gap-3"><Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> <a href={`mailto:${contact.email}`} className="break-all hover:text-gold">{contact.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-ivory/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-xs text-ivory/60 sm:flex-row">
          <p>© 2026 {contact.businessName}. All Rights Reserved.</p>
          <Link to="/admin" className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-4 py-2 font-medium text-ivory/80 transition hover:border-gold hover:text-gold">
            <Icon name="lock" className="h-3.5 w-3.5" /> Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
