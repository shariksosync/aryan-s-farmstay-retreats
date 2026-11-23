import { useCallback, useEffect, useState } from "react";
import Header, { scrollToSection } from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import About from "../components/About.jsx";
import PropertyCards from "../components/PropertyCards.jsx";
import PropertyDetailModal from "../components/PropertyDetailModal.jsx";
import Experiences from "../components/Experiences.jsx";
import WhyChoose from "../components/WhyChoose.jsx";
import Gallery from "../components/Gallery.jsx";
import Contact from "../components/Contact.jsx";
import Footer from "../components/Footer.jsx";
import Icon from "../components/Icons.jsx";
import { useApp } from "../store/AppStore.jsx";

export default function Home() {
  const { contact } = useApp();
  const [detail, setDetail] = useState(null);
  const [prefill, setPrefill] = useState(null);
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowFab(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const enquire = useCallback((patch) => {
    setDetail(null);
    setPrefill({ ...patch, token: Date.now() });
    setTimeout(() => scrollToSection("enquiry"), 50);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <PropertyCards onViewDetails={setDetail} onEnquire={(property) => enquire({ property })} />
        <Experiences onEnquire={(experience) => enquire({ experience })} />
        <WhyChoose />
        <Gallery />
        <Contact prefill={prefill} />
      </main>
      <Footer onOpenProperty={setDetail} />

      <PropertyDetailModal property={detail} onClose={() => setDetail(null)} />

      <a
        href={`https://wa.me/91${contact.whatsapp}?text=${encodeURIComponent("Hi Aryan's Farmstays, I'd like to enquire about a booking.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Enquire on WhatsApp"
        className={`fixed bottom-5 left-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-forest text-ivory shadow-lift transition duration-300 hover:-translate-y-1 hover:bg-deep ${showFab ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <Icon name="whatsapp" className="h-6 w-6" />
      </a>
    </div>
  );
}
