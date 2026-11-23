import { useEffect, useState } from "react";
import Logo from "./Logo.jsx";
import Icon from "./Icons.jsx";
import { useApp } from "../store/AppStore.jsx";

export const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Us" },
  { id: "farmhouses", label: "Our Farmhouses" },
  { id: "experiences", label: "Experiences" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact Us" },
];

export function scrollToSection(id) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Header() {
  const { content, contact } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const items = NAV_ITEMS.filter((i) => i.id !== "gallery" || content.galleryEnabled);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = NAV_ITEMS.map((i) => document.getElementById(i.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [content.galleryEnabled]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    scrollToSection(id);
  };

  const solid = scrolled || open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "border-b border-border/70 bg-cream/95 py-3 shadow-sm backdrop-blur-md" : "bg-transparent py-5"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <button onClick={() => go("home")} aria-label="Aryan's Farmstays home" className="shrink-0">
          <Logo tone={solid ? "dark" : "light"} />
        </button>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`relative rounded-full px-3.5 py-2 text-[0.84rem] font-medium tracking-wide transition-colors ${
                solid ? "text-ink hover:text-forest" : "text-ivory/90 hover:text-ivory"
              }`}
            >
              {item.label}
              <span
                className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300 ${
                  active === item.id ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:+91${contact.phone1}`}
            className={`hidden items-center gap-2 text-sm font-medium xl:inline-flex ${solid ? "text-forest" : "text-ivory"}`}
          >
            <Icon name="phone" className="h-4 w-4" /> {contact.phone1}
          </a>
          <button onClick={() => go("enquiry")} className="btn btn-gold btn-sm hidden sm:inline-flex">
            Enquire Now
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`grid h-11 w-11 place-items-center rounded-full border transition lg:hidden ${
              solid ? "border-border text-deep" : "border-ivory/40 text-ivory"
            }`}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </div>

    </header>
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-[4.4rem] z-40 overflow-y-auto bg-cream lg:hidden">
          <nav className="container-x flex h-full flex-col pt-6 pb-10" aria-label="Mobile">
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                style={{ animationDelay: `${i * 50}ms` }}
                className="flex items-center justify-between border-b border-border py-4 text-left font-display text-3xl text-deep animate-fade-up"
              >
                {item.label}
                <Icon name="arrowRight" className="h-5 w-5 text-gold" />
              </button>
            ))}
            <div className="mt-auto grid gap-3">
              <button onClick={() => go("enquiry")} className="btn btn-gold w-full">Enquire Now</button>
              <a href={`tel:+91${contact.phone1}`} className="btn btn-outline w-full">
                <Icon name="phone" className="h-4 w-4" /> Call {contact.phone1}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
