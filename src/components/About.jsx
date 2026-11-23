import SafeImage from "./SafeImage.jsx";
import Icon from "./Icons.jsx";
import { useApp } from "../store/AppStore.jsx";

const VALUES = [
  { icon: "heart", label: "Hospitality", text: "Warm, attentive care from arrival to farewell." },
  { icon: "bed", label: "Comfort", text: "Clean rooms, cosy beds and thoughtful amenities." },
  { icon: "shield", label: "Privacy", text: "The whole property, reserved only for your group." },
  { icon: "tree", label: "Nature", text: "Orchards, open fields and fresh countryside air." },
  { icon: "sparkles", label: "Memorable Experiences", text: "Moments your family will talk about for years." },
];

export default function About() {
  const { content } = useApp();
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div className="relative">
          <SafeImage src="/images/lawn-seating.jpg" alt="Farmhouse lawn with outdoor seating at sunset" className="aspect-[4/5] rounded-[2rem] shadow-lift sm:aspect-[5/5]" />
          <SafeImage
            src="/images/countryside.jpg"
            alt="Pune countryside at sunrise"
            className="absolute -bottom-10 -right-4 hidden aspect-square w-[42%] rounded-[1.5rem] border-[6px] border-cream shadow-lift sm:block lg:-right-10"
          />
          <div className="absolute -top-6 left-6 rounded-2xl bg-deep px-6 py-5 text-ivory shadow-lift">
            <p className="font-display text-4xl font-semibold text-gold">2</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ivory/80">Flagship estates</p>
          </div>
        </div>

        <div>
          <span className="eyebrow">About Aryan's Farmstays</span>
          <h2 className="display-lg mt-5">{content.aboutHeading}</h2>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-ink/80">{content.aboutDescription}</p>

          <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            {VALUES.map((v) => (
              <li key={v.label} className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-beige text-forest">
                  <Icon name={v.icon} />
                </span>
                <span>
                  <span className="block font-display text-xl font-semibold text-deep">{v.label}</span>
                  <span className="mt-0.5 block text-sm leading-relaxed text-muted-foreground">{v.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
