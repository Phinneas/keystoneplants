import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { getPayload } from "payload";
import config from "@payload-config";
import { ECOREGION_GROUP_META } from "@/lib/ecoregions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Keystone Species List: Plants, Animals, and Ecosystem Connections",
  description:
    "A comprehensive list of keystone species — plants, animals, and the ecosystem connections that hold food webs together. Backed by Tallamy, NWF, and university extension data.",
};

const ECOSYSTEMS = [
  {
    name: "Deciduous Forest",
    plants: [
      "Oaks (Quercus)",
      "Wild Cherry (Prunus)",
      "Willows (Salix)",
      "Birches (Betula)",
    ],
    animals: ["Wood Thrush", "Black Warbler", "Native solitary bees"],
    support:
      "Over 500 caterpillar species, nesting sites, and late-season pollen",
    ecoregion: "northeast",
  },
  {
    name: "Grassland and Prairie",
    plants: [
      "Big Bluestem (Andropogon)",
      "Purple Coneflower (Echinacea)",
      "Milkweed (Asclepias)",
      "Native Sunflowers (Helianthus)",
    ],
    animals: [
      "Monarch Butterfly",
      "Greater Prairie-Chicken",
      "Native ground-nesting bees",
    ],
    support: "Pollinator networks, soil stabilization, seed for songbirds",
    ecoregion: "great-plains",
  },
  {
    name: "Wetlands",
    plants: [
      "Sedges (Carex)",
      "Willows (Salix)",
      "Buttonbush (Cephalanthus)",
      "Blue Flag Iris (Iris versicolor)",
    ],
    animals: ["Red-winged Blackbird", "Spring Peeper Frog", "Dragonflies"],
    support:
      "Water filtration, amphibian breeding habitat, flood attenuation",
    ecoregion: "midwest",
  },
  {
    name: "Coastal and Estuarine",
    plants: [
      "Mangroves (Rhizophora)",
      "Beach Grass (Ammophila)",
      "Sea Oats (Uniola)",
    ],
    animals: ["Horseshoe Crab", "Piping Plover", "Shorebirds"],
    support:
      "Erosion control, migratory bird stopover, nursery habitat for fish",
    ecoregion: "southeast",
  },
  {
    name: "Desert and Arid",
    plants: [
      "Saguaro (Carnegiea)",
      "Mesquite (Prosopis)",
      "Palo Verde (Parkinsonia)",
    ],
    animals: [
      "Gila Woodpecker",
      "Desert Tortoise",
      "Native solitary bees",
    ],
    support: "Shade provision, water capture, nectar for bats and insects",
    ecoregion: "southwest",
  },
  {
    name: "Taiga and Boreal Forest",
    plants: [
      "Spruce (Picea)",
      "Birch (Betula)",
      "Larch (Larix)",
      "Labrador Tea (Rhododendron)",
    ],
    animals: ["Boreal Chickadee", "Caribou", "Spruce Grouse"],
    support: "Cold-climate food web, winter cover, boreal carbon storage",
    ecoregion: "mountain-west",
  },
  {
    name: "Urban and Suburban",
    plants: [
      "Native Oaks (Quercus)",
      "Serviceberry (Amelanchier)",
      "Goldenrod (Solidago)",
    ],
    animals: ["Native bees", "Songbirds", "Butterflies"],
    support:
      "Wildlife corridors, pollinator habitat, stormwater management",
    ecoregion: "northeast",
  },
] as const;

const css = `
.ks-page { color: var(--kn-ink); overflow: hidden; }

/* hero */
.ks-hero { width: min(900px, calc(100% - 2.5rem)); margin: 0 auto; padding: clamp(3rem, 7vw, 6rem) 0 clamp(1.5rem, 3vw, 2.5rem); text-align: center; }
.ks-hero__eyebrow { margin: 0 0 .85rem; color: var(--kn-terra); font-size: .72rem; font-weight: 750; letter-spacing: .2em; text-transform: uppercase; }
.ks-hero__title { max-width: 24ch; margin: 0 auto; color: var(--kn-green); font-family: var(--font-fraunces), serif; font-size: clamp(2.2rem, 5.5vw, 4rem); font-weight: 570; letter-spacing: -.045em; line-height: 1.02; }
.ks-hero__def { max-width: 56ch; margin: 1.25rem auto 0; color: var(--kn-muted); font-size: 1.06rem; line-height: 1.75; }
.ks-hero__ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: .75rem; margin-top: 1.5rem; }
.ks-hero__cta { display: inline-block; border-radius: 100px; padding: 12px 24px; font-weight: 700; text-decoration: none; }
.ks-hero__cta--primary { background: var(--kn-ochre); color: #2a1c08; }
.ks-hero__cta--ghost { border: 1.5px solid var(--kn-line); color: var(--kn-ink); }
.ks-hero__cta--primary:hover { filter: brightness(1.05); }
.ks-hero__cta--ghost:hover { background: color-mix(in srgb, var(--kn-surface) 80%, transparent); }

/* sections */
.ks-section { width: min(1180px, calc(100% - 2.5rem)); margin: 0 auto; padding: clamp(3rem, 6vw, 5rem) 0; }
.ks-section--paper { width: 100%; background: color-mix(in srgb, var(--kn-surface) 58%, transparent); }
.ks-section--paper > .ks-section__inner { width: min(1180px, calc(100% - 2.5rem)); margin: 0 auto; padding: clamp(3rem, 6vw, 5rem) 0; }
.ks-eyebrow { margin: 0 0 .75rem; color: var(--kn-terra); font-size: .72rem; font-weight: 750; letter-spacing: .2em; text-transform: uppercase; }
.ks-heading { max-width: 22ch; margin: 0; color: var(--kn-green); font-family: var(--font-fraunces), serif; font-size: clamp(2rem, 4.5vw, 3.5rem); font-weight: 570; letter-spacing: -.045em; line-height: 1.04; }
.ks-lede { max-width: 60ch; margin: 1.2rem 0 0; color: var(--kn-muted); font-size: 1.03rem; line-height: 1.7; }

/* intro / prose */
.ks-prose { max-width: 68ch; margin: 0 auto; color: var(--kn-muted); font-size: 1rem; line-height: 1.75; }
.ks-prose p { margin: .9rem 0; }
.ks-prose strong { color: var(--kn-ink); }
.ks-prose a { color: var(--kn-green); font-weight: 700; text-decoration: underline; text-decoration-color: var(--kn-ochre); text-underline-offset: .2em; }
.ks-prose a:hover { color: var(--kn-terra); }

/* ecosystem grid */
.ks-eco-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem; margin-top: 2.5rem; }
.ks-eco-card { padding: 1.5rem; border: 1px solid var(--kn-line); border-radius: 16px; background: var(--kn-surface); }
.ks-eco-card__name { margin: 0 0 .75rem; color: var(--kn-green); font-family: var(--font-fraunces), serif; font-size: 1.25rem; font-weight: 600; }
.ks-eco-card__label { margin: .85rem 0 .35rem; color: var(--kn-green2); font-size: .78rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
.ks-eco-card ul { margin: 0 0 .5rem; padding-left: 1.2rem; }
.ks-eco-card li { margin: .2rem 0; color: var(--kn-muted); line-height: 1.55; font-size: .92rem; }
.ks-eco-card__support { margin: .6rem 0 0; color: var(--kn-muted); font-size: .86rem; line-height: 1.55; font-style: italic; }
.ks-eco-card__link { display: inline-block; margin-top: .75rem; color: var(--kn-green); font-weight: 700; font-size: .88rem; text-decoration: none; }
.ks-eco-card__link:hover { text-decoration: underline; }

/* region panels */
.ks-region { margin-top: 2.5rem; padding: 2rem; border: 1px solid var(--kn-line); border-radius: 18px; background: color-mix(in srgb, var(--kn-surface) 90%, transparent); }
.ks-region + .ks-region { margin-top: 1.5rem; }
.ks-region__head { display: flex; flex-wrap: wrap; align-items: baseline; gap: .5rem 1rem; margin-bottom: .75rem; }
.ks-region__name { margin: 0; color: var(--kn-green); font-family: var(--font-fraunces), serif; font-size: 1.5rem; font-weight: 600; }
.ks-region__states { color: var(--kn-ochre); font-size: .82rem; font-weight: 700; letter-spacing: .04em; }
.ks-region__summary { margin: 0 0 1rem; color: var(--kn-muted); line-height: 1.65; font-size: .95rem; }
.ks-species-label { margin: 1rem 0 .4rem; color: var(--kn-green2); font-size: .75rem; font-weight: 750; letter-spacing: .1em; text-transform: uppercase; }
.ks-species-table { width: 100%; border-collapse: collapse; margin-bottom: 1rem; font-size: .9rem; }
.ks-species-table th { text-align: left; padding: .4rem .6rem; color: var(--kn-green); font-weight: 700; border-bottom: 1px solid var(--kn-line); }
.ks-species-table td { padding: .4rem .6rem; color: var(--kn-muted); border-bottom: 1px solid color-mix(in srgb, var(--kn-line) 50%, transparent); }
.ks-species-table td:first-child { font-style: italic; color: var(--kn-ink); }
.ks-region__links { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1rem; }
.ks-region__link { display: inline-block; border-radius: 100px; padding: 8px 18px; font-size: .82rem; font-weight: 700; text-decoration: none; border: 1.5px solid var(--kn-line); color: var(--kn-ink); }
.ks-region__link:hover { background: color-mix(in srgb, var(--kn-surface) 80%, transparent); }

/* food web */
.ks-foodweb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 1.25rem; margin-top: 2.5rem; }
.ks-foodweb-card { padding: 1.5rem; border: 1px solid var(--kn-line); border-radius: 16px; background: var(--kn-surface); }
.ks-foodweb-card__title { margin: 0 0 .5rem; color: var(--kn-green); font-family: var(--font-fraunces), serif; font-size: 1.15rem; font-weight: 600; }
.ks-foodweb-card p { margin: .5rem 0; color: var(--kn-muted); line-height: 1.6; font-size: .93rem; }
.ks-foodweb-card ul { margin: .4rem 0; padding-left: 1.2rem; }
.ks-foodweb-card li { margin: .2rem 0; color: var(--kn-muted); font-size: .9rem; line-height: 1.55; }

/* steps */
.ks-steps-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1.25rem; margin-top: 2.5rem; }
.ks-step { padding: 1.5rem; border: 1px solid var(--kn-line); border-radius: 16px; background: var(--kn-surface); }
.ks-step__num { display: inline-block; width: 32px; height: 32px; border-radius: 50%; background: var(--kn-green); color: #fff; font-family: var(--font-fraunces), serif; font-weight: 700; font-size: .85rem; line-height: 32px; text-align: center; margin-bottom: .65rem; }
.ks-step__title { margin: 0 0 .4rem; color: var(--kn-green); font-family: var(--font-fraunces), serif; font-size: 1.1rem; font-weight: 600; }
.ks-step p { margin: .4rem 0; color: var(--kn-muted); line-height: 1.6; font-size: .9rem; }
.ks-step a { color: var(--kn-green); font-weight: 700; text-decoration: underline; text-decoration-color: var(--kn-ochre); text-underline-offset: .2em; font-size: .88rem; }
.ks-step a:hover { color: var(--kn-terra); }

/* citations */
.ks-citations { max-width: 68ch; margin: 0 auto; }
.ks-citations ul { margin: .8rem 0; padding-left: 1.4rem; }
.ks-citations li { margin: .4rem 0; color: var(--kn-muted); line-height: 1.65; font-size: .9rem; }
.ks-citations a { color: var(--kn-green); font-weight: 700; text-decoration: underline; text-decoration-color: var(--kn-ochre); text-underline-offset: .2em; }
.ks-citations a:hover { color: var(--kn-terra); }

/* CTA band */
.ks-cta { position: relative; overflow: hidden; background: var(--kn-green); color: #fff; }
.ks-cta__inner { width: min(1180px, calc(100% - 2.5rem)); margin: 0 auto; padding: clamp(4rem, 8vw, 7rem) 0; }
.ks-cta h2 { max-width: 18ch; margin: 0; font-family: var(--font-fraunces), serif; font-size: clamp(2.2rem, 5vw, 4rem); font-weight: 550; letter-spacing: -.05em; line-height: 1.01; }
.ks-cta p { max-width: 52ch; margin: 1rem 0 1.5rem; color: rgba(255,255,255,.83); font-size: 1.05rem; line-height: 1.65; }
.ks-cta__actions { display: flex; flex-wrap: wrap; gap: .85rem; }
.ks-cta__primary { display: inline-block; border-radius: 100px; padding: 13px 26px; background: var(--kn-ochre-soft); color: #2a1c08; font-weight: 700; text-decoration: none; }
.ks-cta__ghost { display: inline-block; border: 1px solid rgba(255,255,255,.5); border-radius: 100px; padding: 13px 26px; color: #fff; font-weight: 700; text-decoration: none; }
.ks-cta__primary:hover { filter: brightness(1.05); }
.ks-cta__ghost:hover { background: rgba(255,255,255,.12); }

/* empty state */
.ks-empty { color: var(--kn-muted); font-size: .88rem; font-style: italic; padding: .5rem 0; }

@media (max-width: 700px) {
  .ks-eco-grid, .ks-foodweb-grid, .ks-steps-grid { grid-template-columns: 1fr; }
  .ks-section, .ks-section--paper > .ks-section__inner, .ks-cta__inner { width: min(100% - 2rem, 1180px); }
}
`;

export default async function KeystoneSpeciesPage(): Promise<React.ReactElement> {
  const payload = await getPayload({ config });
  const { docs: allPlants } = await payload.find({
    collection: "plants",
    limit: 200,
    sort: "commonName",
  });

  // group plants by native region
  const plantsByRegion: Record<string, typeof allPlants> = {};
  for (const plant of allPlants) {
    const regions = Array.isArray(plant.nativeRegions)
      ? plant.nativeRegions
      : [];
    for (const region of regions) {
      if (!plantsByRegion[region]) plantsByRegion[region] = [];
      plantsByRegion[region].push(plant);
    }
  }

  // filter plants by wildlife value for food web section
  const caterpillarHosts = allPlants
    .filter(
      (p) =>
        Array.isArray(p.wildlifeValue) &&
        p.wildlifeValue.includes("caterpillar-host")
    )
    .slice(0, 6);
  const pollinators = allPlants
    .filter(
      (p) =>
        Array.isArray(p.wildlifeValue) &&
        p.wildlifeValue.includes("pollinator-plant")
    )
    .slice(0, 6);
  const birdFood = allPlants
    .filter(
      (p) =>
        Array.isArray(p.wildlifeValue) &&
        p.wildlifeValue.includes("bird-food")
    )
    .slice(0, 6);

  return (
    <div className="ks-page">
      <style>{css}</style>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Keystone Species: Plants, Animals, and the Connections That Hold Ecosystems Together",
        description: "A comprehensive list of keystone species — plants, animals, and the ecosystem connections that hold food webs together. Backed by Tallamy, NWF, and university extension data.",
        url: "https://www.keystonenurseries.com/resources/keystone-species",
        publisher: {
          "@type": "Organization",
          name: "Keystone Nurseries",
          url: "https://www.keystonenurseries.com",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": "https://www.keystonenurseries.com/resources/keystone-species",
        },
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a keystone species?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A keystone species is any organism whose presence has an outsized effect on its ecosystem relative to its abundance. Remove it, and the ecosystem changes dramatically. The term was coined by ecologist Robert Paine in the 1960s. Doug Tallamy extended this to plants, finding that 14% of native plant genera support 90% of butterfly and moth caterpillar species.",
            },
          },
          {
            "@type": "Question",
            name: "What are the most important keystone plant genera?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Oaks (Quercus) are the top keystone tree genus in most North American ecoregions, supporting over 400 caterpillar species. Other critical genera include wild cherry (Prunus, 340+ species), willows (Salix, 289+ species), and birches (Betula, 284+ species). For perennials, goldenrod (Solidago) supports 42 specialist bee species and native sunflowers (Helianthus) support 50.",
            },
          },
          {
            "@type": "Question",
            name: "How do I find keystone plants for my ecoregion?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Start by identifying your EPA Level III ecoregion. Keystone Nurseries provides region-specific plant lists ranked by ecological value using data from NWF and Tallamy's research. Enter your ZIP code at keystonenurseries.com to find your ecoregion and the keystone plants that belong there.",
            },
          },
          {
            "@type": "Question",
            name: "Why are native plants important for wildlife?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Native plants form the base of the food web. A single clutch of black-capped chickadees needs 6,000 to 9,000 caterpillars to fledge, and those caterpillars depend on native host plants like oaks, willows, and cherries. Without native plants, the insects disappear — and the birds that depend on them follow.",
            },
          },
          {
            "@type": "Question",
            name: "What percentage of plants support most caterpillar species?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "According to research by Doug Tallamy and colleagues published in Nature Communications (2020), just 14% of native plant genera support 90% of butterfly and moth caterpillar species in a given region.",
            },
          },
        ],
      }} />

      {/* ── Hero ── */}
      <header className="ks-hero">
        <p className="ks-hero__eyebrow">A living reference</p>
        <h1 className="ks-hero__title">
          Keystone Species: Plants, Animals, and the Connections That Hold
          Ecosystems Together
        </h1>
        <p className="ks-hero__def">
          A keystone species is any organism — plant, animal, or fungus — whose
          presence has an outsized effect on its ecosystem relative to its
          abundance. Remove it, and the ecosystem changes dramatically.
        </p>
        <div className="ks-hero__ctas">
          <Link href="/plants" className="ks-hero__cta ks-hero__cta--primary">
            Browse the plant guide
          </Link>
          <Link
            href="/nurseries"
            className="ks-hero__cta ks-hero__cta--ghost"
          >
            Find a nursery
          </Link>
        </div>
      </header>

      {/* ── What is a keystone species? ── */}
      <section className="ks-section" aria-labelledby="what-is-title">
        <p className="ks-eyebrow">The concept</p>
        <h2 id="what-is-title" className="ks-heading">
          What is a keystone species?
        </h2>
        <div className="ks-prose" style={{ marginTop: "1.25rem" }}>
          <p>
            The term comes from architecture: a keystone is the wedge-shaped
            stone at the top of an arch that locks the other stones in place.
            Remove it, and the whole structure collapses — even though it is just
            one stone among many.
          </p>
          <p>
            Ecologist Robert Paine coined the ecological version in the 1960s
            after removing a single starfish species from a tide pool in
            Washington State and watching the entire community structure unravel.
            The defining trait was not size or population but{" "}
            <strong>low functional redundancy</strong>: if a keystone species
            disappears, nothing else in the ecosystem can step in and do its job.
          </p>
          <p>
            Doug Tallamy and his team at the University of Delaware extended this
            work to plants. Their research found that just{" "}
            <strong>
              14% of native plant genera support 90% of butterfly and moth
              caterpillar species
            </strong>{" "}
            in a given region. Those caterpillars are the primary food source
            nestling songbirds need to survive their first weeks of life. Remove
            the plant, and the caterpillars go with it. Remove the caterpillars,
            and so do the birds.
          </p>
          <p>
            Browse our{" "}
            <Link href="/resources/top-20-keystone-plants">
              top 20 keystone plant species
            </Link>{" "}
            for the highest-impact genera nationwide, or explore{" "}
            <Link href="/ecoregions">keystone species by ecoregion</Link> to
            find what matters where you live.
          </p>
        </div>
      </section>

      {/* ── Keystone species by ecosystem ── */}
      <section
        className="ks-section ks-section--paper"
        aria-labelledby="ecosystem-title"
      >
        <div className="ks-section__inner">
          <p className="ks-eyebrow">By ecosystem</p>
          <h2 id="ecosystem-title" className="ks-heading">
            Keystone species across North American ecosystems
          </h2>
          <p className="ks-lede">
            Every ecosystem depends on a small number of species that do the
            heaviest ecological lifting. Here are the keystone players in seven
            major North American biomes.
          </p>
          <div className="ks-eco-grid">
            {ECOSYSTEMS.map((eco) => (
              <article key={eco.name} className="ks-eco-card">
                <h3 className="ks-eco-card__name">{eco.name}</h3>
                <p className="ks-eco-card__label">Key plants</p>
                <ul>
                  {eco.plants.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <p className="ks-eco-card__label">Key animals</p>
                <ul>
                  {eco.animals.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
                <p className="ks-eco-card__support">{eco.support}</p>
                <Link
                  href={`/ecoregions/${eco.ecoregion}`}
                  className="ks-eco-card__link"
                >
                  Explore {eco.ecoregion.replace("-", " ")} ecoregions →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Keystone plants by region ── */}
      <section className="ks-section" aria-labelledby="region-title">
        <p className="ks-eyebrow">By region</p>
        <h2 id="region-title" className="ks-heading">
          Keystone plants by region
        </h2>
        <p className="ks-lede">
          The plants that matter most change depending on where you live. Each
          region panel shows the keystone trees and perennials backed by
          Tallamy&apos;s caterpillar data and NWF specialist-bee research, plus
          any species from our plant database matched to that region.
        </p>

        {ECOREGION_GROUP_META.map((region) => {
          const regionPlants = plantsByRegion[region.nativeRegion] ?? [];
          return (
            <article key={region.slug} className="ks-region">
              <div className="ks-region__head">
                <h3 className="ks-region__name">{region.name}</h3>
                <span className="ks-region__states">{region.states}</span>
              </div>
              <p className="ks-region__summary">{region.summary}</p>

              {/* keystone trees */}
              {region.keystoneTrees.length > 0 && (
                <>
                  <p className="ks-species-label">Keystone trees</p>
                  <table className="ks-species-table">
                    <thead>
                      <tr>
                        <th>Genus</th>
                        <th>Common name</th>
                        <th>Caterpillar species supported</th>
                      </tr>
                    </thead>
                    <tbody>
                      {region.keystoneTrees.map((t) => (
                        <tr key={t.genus}>
                          <td>{t.genus}</td>
                          <td>{t.common}</td>
                          <td>{t.caterpillars.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              {/* keystone perennials */}
              {region.keystonePerennials.length > 0 && (
                <>
                  <p className="ks-species-label">Keystone perennials</p>
                  <table className="ks-species-table">
                    <thead>
                      <tr>
                        <th>Genus</th>
                        <th>Common name</th>
                        <th>Specialist bee species supported</th>
                      </tr>
                    </thead>
                    <tbody>
                      {region.keystonePerennials.map((p) => (
                        <tr key={p.genus}>
                          <td>{p.genus}</td>
                          <td>{p.common}</td>
                          <td>{p.specialistBees}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              {/* plants from our database */}
              {regionPlants.length > 0 && (
                <>
                  <p className="ks-species-label">
                    In our plant database ({regionPlants.length})
                  </p>
                  <ul style={{ paddingLeft: "1.2rem", margin: ".4rem 0 .5rem" }}>
                    {regionPlants.slice(0, 9).map((p) => (
                      <li
                        key={p.id}
                        style={{
                          margin: ".25rem 0",
                          color: "var(--kn-muted)",
                          fontSize: ".9rem",
                          lineHeight: "1.55",
                        }}
                      >
                        <Link
                          href={`/plants/${p.slug}`}
                          style={{
                            color: "var(--kn-green)",
                            fontWeight: 700,
                            textDecoration: "underline",
                            textUnderlineOffset: ".15em",
                          }}
                        >
                          {p.commonName}
                        </Link>{" "}
                        <span style={{ fontStyle: "italic" }}>
                          ({p.scientificName})
                        </span>
                        {p.description ? ` — ${p.description}` : ""}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {regionPlants.length === 0 && (
                <p className="ks-empty">
                  Our plant database is growing. Check back for species matched
                  to this region.
                </p>
              )}

              <div className="ks-region__links">
                <Link
                  href={`/plants?region=${region.nativeRegion}`}
                  className="ks-region__link"
                >
                  Browse all {region.name} plants
                </Link>
                <Link
                  href={`/ecoregions/${region.slug}`}
                  className="ks-region__link"
                >
                  Explore {region.name} ecoregions
                </Link>
              </div>
            </article>
          );
        })}
      </section>

      {/* ── Animal-plant connections ── */}
      <section
        className="ks-section ks-section--paper"
        aria-labelledby="foodweb-title"
      >
        <div className="ks-section__inner">
          <p className="ks-eyebrow">Food web connections</p>
          <h2 id="foodweb-title" className="ks-heading">
            How keystone plants connect to animals
          </h2>
          <p className="ks-lede">
            Keystone plants do not just grow in place. They feed the insects that
            feed the birds. Here are three connections that hold food webs
            together.
          </p>
          <div className="ks-foodweb-grid">
            {/* caterpillar hosts → birds */}
            <article className="ks-foodweb-card">
              <h3 className="ks-foodweb-card__title">
                Caterpillar hosts → songbirds
              </h3>
              <p>
                A single clutch of black-capped chickadees needs{" "}
                <strong>6,000 to 9,000 caterpillars</strong> to fledge. Those
                caterpillars eat oaks, willows, cherries, and birches. Without
                these host plants, the birds cannot breed successfully.
              </p>
              {caterpillarHosts.length > 0 && (
                <>
                  <p style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--kn-green2)", letterSpacing: ".08em", textTransform: "uppercase", margin: ".8rem 0 .3rem" }}>
                    Caterpillar hosts in our database
                  </p>
                  <ul>
                    {caterpillarHosts.map((p) => (
                      <li key={p.id}>
                        <Link href={`/plants/${p.slug}`}>{p.commonName}</Link>{" "}
                        <span style={{ fontStyle: "italic" }}>
                          ({p.scientificName})
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p>
                <Link href="/plants?wildlife=caterpillar-host">
                  Browse all caterpillar host plants →
                </Link>
              </p>
            </article>

            {/* pollinator plants → bees & butterflies */}
            <article className="ks-foodweb-card">
              <h3 className="ks-foodweb-card__title">
                Pollinator plants → bees and butterflies
              </h3>
              <p>
                Native bees need pollen from specific plant genera. Goldenrod
                alone supports 42 specialist bee species. Milkweed is the only
                larval host for monarch butterflies. A garden without native
                pollinator plants is a food desert for these insects.
              </p>
              {pollinators.length > 0 && (
                <>
                  <p style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--kn-green2)", letterSpacing: ".08em", textTransform: "uppercase", margin: ".8rem 0 .3rem" }}>
                    Pollinator plants in our database
                  </p>
                  <ul>
                    {pollinators.map((p) => (
                      <li key={p.id}>
                        <Link href={`/plants/${p.slug}`}>{p.commonName}</Link>{" "}
                        <span style={{ fontStyle: "italic" }}>
                          ({p.scientificName})
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p>
                <Link href="/plants?wildlife=pollinator-plant">
                  Browse all pollinator plants →
                </Link>
              </p>
            </article>

            {/* bird food plants → songbirds */}
            <article className="ks-foodweb-card">
              <h3 className="ks-foodweb-card__title">
                Bird food plants → overwintering birds
              </h3>
              <p>
                Dogwood berries, serviceberry, and sumac hold their fruit
                through winter — the months when natural food is scarcest. These
                plants feed cardinals, cedar waxwings, and robins when insects
                are dormant.
              </p>
              {birdFood.length > 0 && (
                <>
                  <p style={{ fontSize: ".82rem", fontWeight: 700, color: "var(--kn-green2)", letterSpacing: ".08em", textTransform: "uppercase", margin: ".8rem 0 .3rem" }}>
                    Bird food plants in our database
                  </p>
                  <ul>
                    {birdFood.map((p) => (
                      <li key={p.id}>
                        <Link href={`/plants/${p.slug}`}>{p.commonName}</Link>{" "}
                        <span style={{ fontStyle: "italic" }}>
                          ({p.scientificName})
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p>
                <Link href="/plants?wildlife=bird-food">
                  Browse all bird food plants →
                </Link>
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── How to support keystone species ── */}
      <section className="ks-section" aria-labelledby="steps-title">
        <p className="ks-eyebrow">Take action</p>
        <h2 id="steps-title" className="ks-heading">
          How to support keystone species in your yard
        </h2>
        <p className="ks-lede">
          You do not need a large property to make a difference. Four steps can
          turn any yard into functional habitat.
        </p>
        <div className="ks-steps-grid">
          <article className="ks-step">
            <span className="ks-step__num">1</span>
            <h3 className="ks-step__title">Know your ecoregion</h3>
            <p>
              Start with the ecological place you live, not a catalog. Your
              ecoregion determines which species evolved alongside your soil,
              rainfall, and growing season.
            </p>
            <Link href="/ecoregions">Explore ecoregions →</Link>
          </article>

          <article className="ks-step">
            <span className="ks-step__num">2</span>
            <h3 className="ks-step__title">
              Choose keystone plants for your light
            </h3>
            <p>
              Match plants to your actual sun exposure. A keystone oak in deep
              shade will not reach its potential. Use our spacing calculator to
              plan how many plants your bed can support.
            </p>
            <Link href="/plant-spacing-calculator">
              Plant spacing calculator →
            </Link>
            {" / "}
            <Link href="/plants">Browse plants →</Link>
          </article>

          <article className="ks-step">
            <span className="ks-step__num">3</span>
            <h3 className="ks-step__title">Buy from local growers</h3>
            <p>
              Plants grown by regional nurseries are acclimated to your climate
              and soil. A grower network gives you access to species that
              big-box stores do not carry.
            </p>
            <Link href="/nurseries">Find a nursery →</Link>
          </article>

          <article className="ks-step">
            <span className="ks-step__num">4</span>
            <h3 className="ks-step__title">Reduce lawn, add layers</h3>
            <p>
              A ecologically functional yard has canopy trees, understory
              shrubs, groundcover, and leaf litter. Each layer supports different
              insects, birds, and soil organisms. Start by converting one section
              of lawn.
            </p>
            <Link href="/plants">Browse plants by type →</Link>
          </article>
        </div>
      </section>

      {/* ── Research and citations ── */}
      <section
        className="ks-section ks-section--paper"
        aria-labelledby="citations-title"
      >
        <div className="ks-section__inner ks-citations">
          <p className="ks-eyebrow">Sources and research</p>
          <h2 id="citations-title" className="ks-heading">
            The research behind this page
          </h2>
          <ul>
            <li>
              Tallamy, D.W. & Shropshire, K.J. (2020). &ldquo;National
              Biodiversity Rankings for Arthropod Herbivores Based on Their
              Specialization on Native Plant Genera.&rdquo;{" "}
              <em>Nature Communications</em>. Found that 14% of native plant
              genera support 90% of Lepidoptera species.
            </li>
            <li>
              Narango, D.L., Tallamy, D.W., & Shropshire, K.J. (2020).
              &ldquo;Non-native plants reduce the growth of native birds.&rdquo;{" "}
              <em>Nature Communications</em>. Demonstrated the caterpillar-to-bird
              food chain dependency.
            </li>
            <li>
              National Wildlife Federation. &ldquo;Keystone Plants by
              Ecoregion.&rdquo; Regional plant lists ranked by ecological value
              for wildlife.
            </li>
            <li>
              Paine, R.T. (1969). &ldquo;A Note on Trophic Complexity and
              Community Stability.&rdquo; <em>The American Naturalist</em>.
              Original keystone species concept.
            </li>
            <li>
              Xerces Society for Invertebrate Conservation. Pollinator decline
              data and native plant recommendations.
            </li>
          </ul>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ks-section" aria-labelledby="faq-title">
        <p className="ks-eyebrow">Common questions</p>
        <h2 id="faq-title" className="ks-heading">Frequently asked questions</h2>
        <div className="ks-prose" style={{ marginTop: "1.25rem" }}>
          <details style={{ marginBottom: "1.25rem" }}>
            <summary style={{ fontWeight: 700, color: "var(--kn-ink)", cursor: "pointer", marginBottom: ".5rem" }}>
              What makes a plant a keystone species?
            </summary>
            <p>
              A keystone plant species supports a disproportionate number of insect and
              animal species relative to its abundance. Research by Doug Tallamy at the
              University of Delaware found that just <strong>14% of native plant genera
              support 90% of butterfly and moth caterpillar species</strong>. These
              caterpillars are the primary food source for nesting songbirds.
            </p>
          </details>
          <details style={{ marginBottom: "1.25rem" }}>
            <summary style={{ fontWeight: 700, color: "var(--kn-ink)", cursor: "pointer", marginBottom: ".5rem" }}>
              What are the most important keystone trees?
            </summary>
            <p>
              <strong>Oaks (Quercus)</strong> are the top keystone tree genus in most
              North American ecoregions, supporting over 400 caterpillar species. Other
              critical genera include wild cherry (<em>Prunus</em>, 340+ species),
              willows (<em>Salix</em>, 289+ species), and birches (<em>Betula</em>,
              284+ species). The exact rankings vary by ecoregion — see the tables above
              for your region.
            </p>
          </details>
          <details style={{ marginBottom: "1.25rem" }}>
            <summary style={{ fontWeight: 700, color: "var(--kn-ink)", cursor: "pointer", marginBottom: ".5rem" }}>
              How do I find keystone plants for my area?
            </summary>
            <p>
              Start with your ecoregion. Use the{" "}
              <Link href="/search">ZIP code search</Link> at Keystone Nurseries to
              identify your region and see the keystone plants ranked by ecological
              value. You can also{" "}
              <Link href="/ecoregions">browse ecoregions directly</Link> or take the{" "}
              <Link href="/quiz">plant quiz</Link> to get personalized recommendations.
            </p>
          </details>
          <details style={{ marginBottom: "1.25rem" }}>
            <summary style={{ fontWeight: 700, color: "var(--kn-ink)", cursor: "pointer", marginBottom: ".5rem" }}>
              Why are native plants important for birds?
            </summary>
            <p>
              A single clutch of black-capped chickadees needs{" "}
              <strong>6,000 to 9,000 caterpillars</strong> to fledge. Those caterpillars
              eat native plants — primarily oaks, willows, cherries, and birches. Without
              these host plants, the caterpillars disappear, and the birds that depend on
              them cannot breed successfully. This caterpillar-to-bird food chain was
              documented by Narango, Tallamy &amp; Shropshire (2020) in{" "}
              <em>Nature Communications</em>.
            </p>
          </details>
          <details style={{ marginBottom: "1.25rem" }}>
            <summary style={{ fontWeight: 700, color: "var(--kn-ink)", cursor: "pointer", marginBottom: ".5rem" }}>
              Where can I buy keystone native plants?
            </summary>
            <p>
              Use the <Link href="/nurseries">nursery finder</Link> to search by ZIP code
              for native plant nurseries near you. Plants grown by regional nurseries are
              acclimated to your local climate and soil, and they often carry species that
              big-box stores do not stock.
            </p>
          </details>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="ks-cta" aria-labelledby="cta-title">
        <div className="ks-cta__inner">
          <h2 id="cta-title">Ready to plant keystone species?</h2>
          <p>
            Find the plants that belong in your ecoregion, then locate a grower
            close to home.
          </p>
          <div className="ks-cta__actions">
            <Link href="/plants" className="ks-cta__primary">
              Browse the plant guide
            </Link>
            <Link href="/nurseries" className="ks-cta__ghost">
              Find a nursery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
