import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Reveal, RevealItem } from "@/components/Reveal";
import { SwayingMeadow } from "@/components/SwayingMeadow";
import { ZipSearchForm } from "@/components/ZipSearchForm";

const DISCOVERY_PATHS = [
  {
    number: "01",
    title: "Find a nursery",
    copy: "Search by ZIP code to find growers and plant people within reach of your landscape.",
    href: "/nurseries",
    label: "Explore nurseries",
  },
  {
    number: "02",
    title: "Meet the plants",
    copy: "Browse the trees, grasses, flowers, and host plants that make a place feel more alive.",
    href: "/plants",
    label: "Browse plant guide",
  },
  {
    number: "03",
    title: "Know your place",
    copy: "Start with your ecoregion and discover a more specific, resilient way to plant at home.",
    href: "/ecoregions",
    label: "Explore ecoregions",
  },
] as const;

export default function HomePage(): React.ReactElement {
  return (
    <div className="field-home">
      <Hero
        image="/hero-native-meadow.jpg"
        eyebrow="A living field guide for native plants"
        words={["Plant", "what", "belongs", "here."]}
        sub="Find the growers, regional knowledge, and plants that make your corner of the world more alive."
        ctaLabel="Find a nursery"
        ctaHref="#find-a-nursery"
      />

      <section id="find-a-nursery" className="field-search-panel" aria-labelledby="find-a-nursery-title">
        <p id="find-a-nursery-title" className="field-search-panel__label">Start close to home</p>
        <p className="field-search-panel__copy">Enter your ZIP code to find native plant nurseries and regional growing knowledge nearby.</p>
        <ZipSearchForm />
        <p className="mt-3 text-sm text-[var(--kn-muted)]">
          Prefer to wander? <Link href="/nurseries" className="field-link">Browse every nursery in the guide.</Link>
        </p>
      </section>

      <section className="field-section" aria-labelledby="discover-title">
        <Reveal>
          <RevealItem>
            <p className="field-section__eyebrow">Begin with belonging</p>
            <h2 id="discover-title" className="field-section__heading">A more generous way to grow.</h2>
            <p className="field-section__lede">
              Keystone Nurseries connects people with the living fabric of their own places. Use it to find good sources, learn what thrives nearby, and make every planting choice a little more meaningful.
            </p>
          </RevealItem>
        </Reveal>

        <Reveal className="field-paths" gap={0.14}>
          {DISCOVERY_PATHS.map((path) => (
            <RevealItem key={path.href}>
              <article className="field-path">
                <span className="field-path__number">{path.number}</span>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
                <Link href={path.href} className="field-link mt-5">{path.label} <span aria-hidden>→</span></Link>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </section>

      <section className="field-section--paper" aria-label="Keystone field note">
        <div className="field-section__inner">
          <Reveal>
            <RevealItem>
              <div className="field-fieldnote">
                <blockquote className="field-fieldnote__quote">
                  “The landscape already knows what it wants to become. A good garden learns to listen.”
                </blockquote>
                <p className="field-fieldnote__aside">
                  Native plants are not a look to copy. They are a relationship to rebuild—between soil and rainfall, caterpillar and bird, the seasons you notice and the place you call home.
                </p>
              </div>
            </RevealItem>
          </Reveal>
        </div>
      </section>

      <section className="field-cta" aria-labelledby="contribute-title">
        <SwayingMeadow />
        <div className="field-cta__inner">
          <Reveal>
            <RevealItem>
              <p className="field-section__eyebrow text-[var(--kn-ochre-soft)]">Let the guide grow</p>
              <h2 id="contribute-title">Know a nursery doing good work?</h2>
              <p>Help make native plants easier to find. Share a nursery, a seasonal sale, or a local grower with your community.</p>
              <Link href="/suggest" className="kn-btn field-cta__button">
                <span className="kn-btn__label">Add a nursery</span>
              </Link>
            </RevealItem>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
