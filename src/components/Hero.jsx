import SafeImage from "./SafeImage.jsx";
import Icon from "./Icons.jsx";
import { scrollToSection } from "./Header.jsx";
import { useApp } from "../store/AppStore.jsx";

const STRIP = [
  { icon: "home", label: "Private Farmhouses" },
  { icon: "pool", label: "Swimming Pool Villas" },
  { icon: "users", label: "Family Getaways" },
  { icon: "celebrate", label: "Private Celebrations" },
];

function SplitHeading({ text }) {
  const idx = text.indexOf(". ");
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx + 1)}
      <br />
      <em className="font-normal text-gold">{text.slice(idx + 2)}</em>
    </>
  );
}

export default function Hero() {
  const { content } = useApp();
  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-deep">
      <SafeImage
        src={content.heroImage}
        alt="Luxury farmhouse with swimming pool surrounded by greenery"
        loading="eager"
        className="absolute inset-0"
        imgClassName="animate-slow-zoom"
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="container-x relative flex flex-1 flex-col justify-center pt-32 pb-16">
        <div className="max-w-3xl">
          <span className="eyebrow animate-fade-up text-gold">Farmhouses near Pune · Maharashtra</span>
          <h1 className="display-xl mt-6 text-ivory animate-fade-up [animation-delay:120ms]">
            <SplitHeading text={content.heroHeading} />
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/85 animate-fade-up [animation-delay:240ms] sm:text-lg">
            {content.heroSubtitle}
          </p>
          <div className="mt-9 flex flex-col gap-3 animate-fade-up [animation-delay:360ms] sm:flex-row">
            <button onClick={() => scrollToSection("farmhouses")} className="btn btn-gold">
              Explore Our Farmhouses <Icon name="arrowRight" className="h-4 w-4" />
            </button>
            <button onClick={() => scrollToSection("enquiry")} className="btn btn-glass">
              Book Your Experience
            </button>
          </div>
        </div>
      </div>

      <div className="relative border-t border-ivory/15 bg-deep/55 backdrop-blur-md">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4">
          {STRIP.map((s, i) => (
            <div
              key={s.label}
              className={`flex items-center gap-3 py-5 text-ivory ${i % 2 === 1 ? "pl-4 sm:pl-6" : ""} ${
                i > 0 ? "lg:border-l lg:border-ivory/15 lg:pl-6" : ""
              }`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-gold/50 text-gold">
                <Icon name={s.icon} className="h-[1.1rem] w-[1.1rem]" />
              </span>
              <span className="text-[0.8rem] font-medium tracking-wide sm:text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
