import Icon from "./Icons.jsx";
import SafeImage from "./SafeImage.jsx";
import { useApp } from "../store/AppStore.jsx";

const ICONS = ["mountain", "shield", "tree", "pool", "users", "heart"];

export default function WhyChoose() {
  const { content } = useApp();
  return (
    <section className="relative overflow-hidden bg-deep py-24 text-ivory sm:py-32">
      <div className="grain absolute inset-0 opacity-60" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="eyebrow text-gold">Why us</span>
          <h2 className="mt-5 font-display text-[clamp(2.1rem,4.2vw,3.6rem)] font-medium leading-[1.08] text-ivory">{content.whyHeading}</h2>
          <p className="mt-5 max-w-md leading-relaxed text-ivory/75">{content.whySubtitle}</p>
          <SafeImage src="/images/pool-party.jpg" alt="Poolside at the farmhouse" className="mt-10 hidden aspect-[4/3] rounded-[1.6rem] lg:block" />
        </div>
        <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-ivory/10 bg-ivory/10 sm:grid-cols-2">
          {content.whyItems.map((item, i) => (
            <div key={i} className="group bg-deep p-8 transition-colors duration-300 hover:bg-forest sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/50 text-gold transition group-hover:bg-gold group-hover:text-deep">
                <Icon name={ICONS[i % ICONS.length]} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-ivory">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ivory/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
