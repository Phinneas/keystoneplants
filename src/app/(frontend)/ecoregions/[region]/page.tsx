import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'
import { PlantCard } from '@/components/PlantCard'
import { getPlants } from '@/lib/plants'
import { getGroupBySlug, getEcoregionsByGroup } from '@/lib/ecoregions'

export const dynamic = 'force-dynamic'

interface RegionPageProps {
  params: Promise<{ region: string }>
}

export async function generateMetadata({ params }: RegionPageProps): Promise<Metadata> {
  const { region } = await params
  const group = getGroupBySlug(region)
  if (!group) return {}
  return {
    title: `Keystone Plants of the ${group.name}`,
    description: `The top native keystone plants for the ${group.name} ecoregion. ${group.summary.slice(0, 120)}…`,
  }
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { region } = await params
  const group = getGroupBySlug(region)
  if (!group) notFound()

  // Level III ecoregions within this group
  const subEcoregions = getEcoregionsByGroup(group.name)

  // Plants from DB filtered by matching nativeRegion
  const plants = await getPlants({ nativeRegion: group.nativeRegion })

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Keystone Plants of the ${group.name}`,
        description: group.summary,
        url: `https://www.keystonenurseries.com/ecoregions/${group.slug}`,
        numberOfItems: group.keystoneTrees.length + group.keystonePerennials.length,
        itemListElement: [
          ...group.keystoneTrees.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${t.common} (${t.genus})`,
            description: `Keystone tree supporting ${t.caterpillars} caterpillar species`,
          })),
          ...group.keystonePerennials.map((p, i) => ({
            "@type": "ListItem",
            position: group.keystoneTrees.length + i + 1,
            name: `${p.common} (${p.genus})`,
            description: `Keystone perennial supporting ${p.specialistBees} specialist bee species`,
          })),
        ],
      }} />

      {/* Breadcrumb */}
      <nav className="text-xs text-[var(--kn-muted)] flex items-center gap-1.5">
        <Link href="/ecoregions" className="hover:text-[var(--kn-ink)] transition-colors">
          Ecoregions
        </Link>
        <span>/</span>
        <span className="text-[var(--kn-ink)] font-medium">{group.name}</span>
      </nav>

      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="text-xs font-medium text-[var(--kn-muted)] uppercase tracking-widest">
          {group.nwfEcoregion}
        </div>
        <h1 className="text-3xl font-bold text-[var(--kn-ink)] font-[var(--font-figtree)]">
          Keystone Plants of the {group.name}
        </h1>
        <p className="text-base text-[var(--kn-muted)] leading-relaxed">{group.summary}</p>

        {/* States */}
        <p className="text-sm text-[var(--kn-muted)]">
          <span className="font-medium text-[var(--kn-ink)]">States:</span> {group.states}
        </p>
      </div>

      {/* Level III ecoregion chips */}
      {subEcoregions.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[var(--kn-ink)]">
            Level III Ecoregions in this region
          </h2>
          <div className="flex flex-wrap gap-2">
            {subEcoregions.map((eco) => (
              <span
                key={eco.code}
                className="text-xs px-2.5 py-1 rounded-sm border border-[var(--kn-line)] bg-[var(--kn-surface)] text-[var(--kn-muted)]"
              >
                {eco.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Keystone genera tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Trees */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-[var(--kn-ink)] font-[var(--font-figtree)]">
            Top Keystone Trees
          </h2>
          <p className="text-xs text-[var(--kn-muted)]">
            Ranked by caterpillar species supported (NWF / Tallamy data)
          </p>
          <div className="border border-[var(--kn-line)] rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--kn-surface)] text-left">
                  <th className="px-3 py-2 text-xs font-semibold text-[var(--kn-ink)]">Genus</th>
                  <th className="px-3 py-2 text-xs font-semibold text-[var(--kn-ink)]">Common name</th>
                  <th className="px-3 py-2 text-xs font-semibold text-[var(--kn-ink)] text-right">
                    Caterpillar spp.
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.keystoneTrees.map((t, i) => (
                  <tr
                    key={t.genus}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-[var(--kn-paper)]'}
                  >
                    <td className="px-3 py-2 text-[var(--kn-ink)] italic font-medium">{t.genus}</td>
                    <td className="px-3 py-2 text-[var(--kn-muted)]">{t.common}</td>
                    <td className="px-3 py-2 text-right">
                      {t.caterpillars > 0 ? (
                        <span className="font-semibold text-[var(--kn-ink)]">{t.caterpillars}</span>
                      ) : (
                        <span className="text-[var(--kn-muted)] text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Perennials */}
        <div className="space-y-3">
          <h2 className="text-base font-bold text-[var(--kn-ink)] font-[var(--font-figtree)]">
            Top Keystone Perennials
          </h2>
          <p className="text-xs text-[var(--kn-muted)]">
            Ranked by pollen specialist bee species supported (Fowler data)
          </p>
          <div className="border border-[var(--kn-line)] rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--kn-surface)] text-left">
                  <th className="px-3 py-2 text-xs font-semibold text-[var(--kn-ink)]">Genus</th>
                  <th className="px-3 py-2 text-xs font-semibold text-[var(--kn-ink)]">Common name</th>
                  <th className="px-3 py-2 text-xs font-semibold text-[var(--kn-ink)] text-right">
                    Specialist bees
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.keystonePerennials.map((p, i) => (
                  <tr
                    key={p.genus}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-[var(--kn-paper)]'}
                  >
                    <td className="px-3 py-2 text-[var(--kn-ink)] italic font-medium">{p.genus}</td>
                    <td className="px-3 py-2 text-[var(--kn-muted)]">{p.common}</td>
                    <td className="px-3 py-2 text-right font-semibold text-[var(--kn-ochre)]">
                      {p.specialistBees}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Plant directory */}
      <div className="space-y-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-bold text-[var(--kn-ink)] font-[var(--font-figtree)]">
            Native Plants in the Directory
          </h2>
          {plants.length > 0 && (
            <p className="text-sm text-[var(--kn-muted)]">
              {plants.length} plant{plants.length !== 1 ? 's' : ''} listed
            </p>
          )}
        </div>

        {plants.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-[var(--kn-line)] rounded-sm space-y-2">
            <p className="text-sm font-medium text-[var(--kn-ink)]">
              No plants in the directory for this region yet.
            </p>
            <p className="text-sm text-[var(--kn-muted)]">
              The directory is actively being expanded — check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plants.map((plant) => (
              <PlantCard key={plant.id} {...plant} />
            ))}
          </div>
        )}
      </div>

      {/* NWF source credit */}
      <div className="border border-[var(--kn-line)] rounded-sm px-5 py-4 bg-[var(--kn-surface)] text-sm text-[var(--kn-muted)] space-y-1">
        <p>
          <span className="font-medium text-[var(--kn-ink)]">Data source:</span> Keystone plant rankings
          based on{' '}
          <a
            href="https://www.nwf.org/Native-Plant-Habitats/Plant-Native/Why-Native/Keystone-Plants-by-Ecoregion"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[var(--kn-ink)]"
          >
            NWF Keystone Plants by Ecoregion
          </a>{' '}
          and Narango, Tallamy &amp; Shropshire (2020),{' '}
          <em>Nature Communications</em>. Specialist bee data from Fowler (2016), USDA Forest Service.
        </p>
      </div>

      {/* FAQ */}
      <section className="space-y-4" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-lg font-bold text-[var(--kn-ink)] font-[var(--font-figtree)]">
          Frequently asked questions
        </h2>
        <div className="space-y-4 text-sm text-[var(--kn-muted)]">
          <details>
            <summary className="font-semibold text-[var(--kn-ink)] cursor-pointer mb-1">
              What are the most important keystone plants for the {group.name}?
            </summary>
            <p className="leading-relaxed">
              In the {group.name}, the top keystone tree genera are{' '}
              {group.keystoneTrees.slice(0, 3).map((t) => `${t.common} (${t.genus})`).join(', ')}.
              For perennials, {group.keystonePerennials.slice(0, 2).map((p) => `${p.common} (${p.genus})`).join(' and ')}{' '}
              support the most specialist pollinator species. Rankings are based on{' '}
              Doug Tallamy&apos;s caterpillar data and NWF ecoregion research.
            </p>
          </details>
          <details>
            <summary className="font-semibold text-[var(--kn-ink)] cursor-pointer mb-1">
              What states are in the {group.name} ecoregion?
            </summary>
            <p className="leading-relaxed">
              The {group.name} ecoregion ({group.nwfEcoregion}) includes: {group.states}.
            </p>
          </details>
          <details>
            <summary className="font-semibold text-[var(--kn-ink)] cursor-pointer mb-1">
              How do I find native plant nurseries in the {group.name}?
            </summary>
            <p className="leading-relaxed">
              Use the <Link href="/search" className="underline hover:text-[var(--kn-ink)]">ZIP code search</Link>{' '}
              to find native plant nurseries near you in the {group.name}. The directory includes
              growers who specialize in regionally native plants, many of which carry keystone species
              not available at big-box stores.
            </p>
          </details>
        </div>
      </section>

      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `What are the most important keystone plants for the ${group.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `In the ${group.name}, the top keystone tree genera are ${group.keystoneTrees.slice(0, 3).map((t) => `${t.common} (${t.genus})`).join(', ')}. For perennials, ${group.keystonePerennials.slice(0, 2).map((p) => `${p.common} (${p.genus})`).join(' and ')} support the most specialist pollinator species.`,
            },
          },
          {
            "@type": "Question",
            name: `What states are in the ${group.name} ecoregion?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `The ${group.name} ecoregion (${group.nwfEcoregion}) includes: ${group.states}.`,
            },
          },
          {
            "@type": "Question",
            name: `How do I find native plant nurseries in the ${group.name}?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `Use the ZIP code search at keystonenurseries.com to find native plant nurseries near you in the ${group.name}. The directory includes growers who specialize in regionally native plants.`,
            },
          },
        ],
      }} />

      {/* CTA — zip search */}
      <div className="border-t border-[var(--kn-line)] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[var(--kn-ink)]">
            Get results for your specific location
          </p>
          <p className="text-sm text-[var(--kn-muted)]">
            Enter your zip code for a ranked list filtered to your exact ecoregion and growing
            conditions.
          </p>
        </div>
        <Link
          href="/search"
          className="shrink-0 inline-block bg-[var(--kn-green-deep)] text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-[var(--kn-green-deep)] transition-colors"
        >
          Search by zip →
        </Link>
      </div>
    </div>
  )
}
