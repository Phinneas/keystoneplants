import type { Metadata } from "next";
import Link from "next/link";
import { PlantSpacingCalculator } from "@/components/PlantSpacingCalculator";

export const metadata: Metadata = {
  title: "Plant Spacing Calculator",
  description:
    "Find the right on-center spacing for your native plant bed. Enter your bed size and plant count to see how far apart to plant.",
};

const HOW_IT_WORKS = [
  {
    title: "Center to center",
    copy: "Spacing is measured from the center of one plant to the center of the next — not from leaf edge to leaf edge.",
  },
  {
    title: "Room to fill in",
    copy: "Native perennials need a couple of seasons to close the gaps. Space for the mature spread, and let the planting knit together on its own.",
  },
  {
    title: "A square grid",
    copy: "This calculator uses square-grid spacing: every plant gets an equal cell of bed area. A triangular grid packs roughly 15% more plants into the same space.",
  },
] as const;

const SPACING_GUIDE = [
  { name: "Groundcovers & plugs", range: "12–18 in", note: "Close spacing that shades out weeds fast." },
  { name: "Perennials", range: "18–24 in", note: "The working range for most flowering natives." },
  { name: "Grasses & sedges", range: "18–30 in", note: "Room for clumps to breathe and stand upright." },
  { name: "Shrubs", range: "3–6 ft", note: "Space for mature spread without crowding." },
  { name: "Small trees", range: "10–15 ft", note: "Understory trees need light between canopies." },
  { name: "Canopy trees", range: "30–60 ft", note: "Oaks and others that become the backbone." },
] as const;

const css = `
.psc-page { overflow: hidden; }

.psc-intro {
  width: min(880px, calc(100% - 2.5rem));
  margin: 0 auto;
  padding: clamp(3rem, 7vw, 6rem) 0 clamp(2rem, 4vw, 3rem);
  text-align: center;
}
.psc-intro__eyebrow { margin: 0 0 .85rem; color: var(--kn-terra); font-size: .72rem; font-weight: 750; letter-spacing: .2em; text-transform: uppercase; }
.psc-intro__title { max-width: 20ch; margin: 0 auto; color: var(--kn-green); font-family: var(--font-fraunces), serif; font-size: clamp(2.4rem, 5.5vw, 4.4rem); font-weight: 570; letter-spacing: -.045em; line-height: 1.02; }
.psc-intro__lede { max-width: 56ch; margin: 1.25rem auto 0; color: var(--kn-muted); font-size: 1.06rem; line-height: 1.72; }

.psc-calcwrap { width: min(880px, calc(100% - 2rem)); margin: 0 auto; padding-bottom: clamp(3rem, 6vw, 5rem); }
.psc-calc {
  padding: clamp(1.4rem, 3.5vw, 2.25rem);
  border: 1px solid var(--kn-line);
  border-radius: 22px;
  background: color-mix(in srgb, var(--kn-surface) 94%, transparent);
  box-shadow: 0 28px 60px -38px rgba(22, 39, 27, .48);
}
.psc-calc__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
.psc-field { display: flex; flex-direction: column; gap: .5rem; }
.psc-field__label { color: var(--kn-green); font-family: var(--font-fraunces), serif; font-size: 1.02rem; font-weight: 600; }
.psc-field__unit { position: relative; display: flex; align-items: center; }
.psc-input {
  width: 100%;
  border: 1.5px solid var(--kn-line);
  border-radius: 14px;
  background: var(--kn-paper);
  color: var(--kn-ink);
  padding: .8rem 3.6rem .8rem 1rem;
  outline: none;
  font: inherit;
  font-size: 1.05rem;
  transition: border-color .25s ease, box-shadow .25s ease;
}
.psc-input::placeholder { color: color-mix(in srgb, var(--kn-muted) 60%, transparent); }
.psc-input:focus { border-color: var(--kn-green2); box-shadow: 0 0 0 4px color-mix(in srgb, var(--kn-ochre-soft) 45%, transparent); }
.psc-field__suffix { position: absolute; right: 1rem; color: var(--kn-muted); font-size: .86rem; pointer-events: none; }
.psc-result { margin-top: 1.5rem; padding: 1.5rem 1.75rem; border-radius: 16px; background: var(--kn-green); color: #fff; text-align: center; }
.psc-result__label { margin: 0 0 .35rem; color: var(--kn-ochre-soft); font-size: .72rem; font-weight: 750; letter-spacing: .18em; text-transform: uppercase; }
.psc-result__value { margin: 0; font-family: var(--font-fraunces), serif; font-size: clamp(2.6rem, 8vw, 4.2rem); font-weight: 570; letter-spacing: -.04em; line-height: 1; }
.psc-result__note { margin: .5rem 0 0; color: rgba(255,255,255,.9); font-size: 1.02rem; }
.psc-result__meta { margin: .85rem 0 0; color: rgba(255,255,255,.72); font-size: .86rem; }
.psc-result__empty { margin: 0; color: rgba(255,255,255,.85); font-size: 1rem; }

.psc-section { width: min(1180px, calc(100% - 2.5rem)); margin: 0 auto; padding: clamp(3rem, 6vw, 5rem) 0; }
.psc-section--paper { width: 100%; background: color-mix(in srgb, var(--kn-surface) 58%, transparent); }
.psc-section--paper > .psc-section__inner { width: min(1180px, calc(100% - 2.5rem)); margin: 0 auto; }
.psc-section__eyebrow { margin: 0 0 .75rem; color: var(--kn-terra); font-size: .72rem; font-weight: 750; letter-spacing: .2em; text-transform: uppercase; }
.psc-section__heading { max-width: 22ch; margin: 0; color: var(--kn-green); font-family: var(--font-fraunces), serif; font-size: clamp(2rem, 4.5vw, 3.5rem); font-weight: 570; letter-spacing: -.045em; line-height: 1.04; }
.psc-section__lede { max-width: 56ch; margin: 1.2rem 0 0; color: var(--kn-muted); font-size: 1.03rem; line-height: 1.7; }
.psc-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-top: 2.75rem; }
.psc-card { padding: 1.5rem; border: 1px solid var(--kn-line); border-radius: 16px; background: var(--kn-surface); color: var(--kn-ink); }
.psc-card__title { margin: 0; color: var(--kn-green); font-family: var(--font-fraunces), serif; font-size: 1.35rem; font-weight: 600; line-height: 1.1; }
.psc-card__range { margin: .6rem 0 0; color: var(--kn-ochre); font-family: var(--font-fraunces), serif; font-size: 1.6rem; font-weight: 570; line-height: 1; }
.psc-card p { margin: .75rem 0 0; color: var(--kn-muted); line-height: 1.6; }

.psc-cta { position: relative; overflow: hidden; background: var(--kn-green); color: #fff; }
.psc-cta__inner { width: min(1180px, calc(100% - 2.5rem)); margin: 0 auto; padding: clamp(4rem, 8vw, 7rem) 0; }
.psc-cta h2 { max-width: 16ch; margin: 0; font-family: var(--font-fraunces), serif; font-size: clamp(2.4rem, 5vw, 4.4rem); font-weight: 550; letter-spacing: -.05em; line-height: 1.01; }
.psc-cta p { max-width: 52ch; margin: 1.2rem 0 1.7rem; color: rgba(255,255,255,.83); font-size: 1.05rem; line-height: 1.65; }
.psc-cta__actions { display: flex; flex-wrap: wrap; gap: .85rem; }
.psc-cta__primary { display: inline-block; border-radius: 100px; padding: 13px 26px; background: var(--kn-ochre-soft); color: #2a1c08; font-weight: 700; text-decoration: none; }
.psc-cta__ghost { display: inline-block; border: 1px solid rgba(255,255,255,.5); border-radius: 100px; padding: 13px 26px; color: #fff; font-weight: 700; text-decoration: none; }
.psc-cta__primary:hover { filter: brightness(1.05); }
.psc-cta__ghost:hover { background: rgba(255,255,255,.12); }

@media (max-width: 760px) {
  .psc-calc__grid { grid-template-columns: 1fr; }
  .psc-cards { grid-template-columns: 1fr; }
  .psc-section, .psc-section--paper > .psc-section__inner, .psc-cta__inner { width: min(100% - 2rem, 1180px); }
  .psc-intro { width: min(100% - 2rem, 880px); }
}
`;

export default function PlantSpacingCalculatorPage(): React.ReactElement {
  return (
    <div className="psc-page">
      <style>{css}</style>

      <header className="psc-intro">
        <p className="psc-intro__eyebrow">Planting math · the field guide</p>
        <h1 className="psc-intro__title">Give each plant its own room to belong.</h1>
        <p className="psc-intro__lede">
          Overcrowded natives compete for light, water, and root space. Enter your bed size and plant
          count to find the on-center spacing that lets a planting fill in without choking itself out.
        </p>
      </header>

      <section className="psc-calcwrap" aria-label="Plant spacing calculator">
        <PlantSpacingCalculator />
      </section>

      <section className="psc-section--paper" aria-labelledby="how-it-works-title">
        <div className="psc-section__inner">
          <p className="psc-section__eyebrow">A quick read</p>
          <h2 id="how-it-works-title" className="psc-section__heading">
            What on-center spacing actually means.
          </h2>
          <div className="psc-cards">
            {HOW_IT_WORKS.map((item) => (
              <article key={item.title} className="psc-card">
                <h3 className="psc-card__title">{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="psc-section" aria-labelledby="guide-title">
        <p className="psc-section__eyebrow">Starting points</p>
        <h2 id="guide-title" className="psc-section__heading">
          A rough spacing guide by plant type.
        </h2>
        <p className="psc-section__lede">
          Every species has its own mature spread — check the plant guide for specifics. These ranges
          are a sensible place to begin.
        </p>
        <div className="psc-cards">
          {SPACING_GUIDE.map((item) => (
            <article key={item.name} className="psc-card">
              <h3 className="psc-card__title">{item.name}</h3>
              <p className="psc-card__range">{item.range}</p>
              <p>{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="psc-cta" aria-labelledby="cta-title">
        <div className="psc-cta__inner">
          <h2 id="cta-title">Spacing is only half the story.</h2>
          <p>
            The right plant still has to belong in your ecoregion, light, and soil. Browse the plant
            guide or find a grower close to home.
          </p>
          <div className="psc-cta__actions">
            <Link href="/plants" className="psc-cta__primary">
              Browse the plant guide
            </Link>
            <Link href="/nurseries" className="psc-cta__ghost">
              Find a nursery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
