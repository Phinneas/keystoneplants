import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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

      {/* Breadcrumb */}
      <nav className="text-xs text-[#6b5b5d] flex items-center gap-1.5">
        <Link href="/ecoregions" className="hover:text-[#3D0C11] transition-colors">
          Ecoregions
        </Link>
        <span>/</span>
        <span className="text-[#3D0C11] font-medium">{group.name}</span>
      </nav>

      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="text-xs font-medium text-[#6b5b5d] uppercase tracking-widest">
          {group.nwfEcoregion}
        </div>
        <h1 className="text-3xl font-bold text-[#3D0C11] font-[var(--font-figtree)]">
          Keystone Plants of the {group.name}
        </h1>
        <p className="text-base text-[#6b5b5d] leading-relaxed">{group.summary}</p>

        {/* States */}
        <p className="text-sm text-[#6b5b5d]">
          <span className="font-medium text-[#3D0C11]">States:</span> {group.states}
        </p>
      </div>

      {/* Level III ecoregion chips */}
      {subEcoregions.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-[#3D0C11]">
            Level III Ecoregions in this region
          </h2>
          <div className="flex flex-wrap gap-2">
            {subEcoregions.map((eco) => (
              <span
                key={eco.code}
                className="text-xs px-2.5 py-1 rounded-sm border border-[#e8f5d8] bg-[#f8fef3] text-[#6b5b5d]"
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
          <h2 className="text-base font-bold text-[#3D0C11] font-[var(--font-figtree)]">
            Top Keystone Trees
          </h2>
          <p className="text-xs text-[#6b5b5d]">
            Ranked by caterpillar species supported (NWF / Tallamy data)
          </p>
          <div className="border border-[#e8f5d8] rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f8fef3] text-left">
                  <th className="px-3 py-2 text-xs font-semibold text-[#3D0C11]">Genus</th>
                  <th className="px-3 py-2 text-xs font-semibold text-[#3D0C11]">Common name</th>
                  <th className="px-3 py-2 text-xs font-semibold text-[#3D0C11] text-right">
                    Caterpillar spp.
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.keystoneTrees.map((t, i) => (
                  <tr
                    key={t.genus}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafdf6]'}
                  >
                    <td className="px-3 py-2 text-[#3D0C11] italic font-medium">{t.genus}</td>
                    <td className="px-3 py-2 text-[#6b5b5d]">{t.common}</td>
                    <td className="px-3 py-2 text-right">
                      {t.caterpillars > 0 ? (
                        <span className="font-semibold text-[#3D0C11]">{t.caterpillars}</span>
                      ) : (
                        <span className="text-[#6b5b5d] text-xs">—</span>
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
          <h2 className="text-base font-bold text-[#3D0C11] font-[var(--font-figtree)]">
            Top Keystone Perennials
          </h2>
          <p className="text-xs text-[#6b5b5d]">
            Ranked by pollen specialist bee species supported (Fowler data)
          </p>
          <div className="border border-[#e8f5d8] rounded-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#f8fef3] text-left">
                  <th className="px-3 py-2 text-xs font-semibold text-[#3D0C11]">Genus</th>
                  <th className="px-3 py-2 text-xs font-semibold text-[#3D0C11]">Common name</th>
                  <th className="px-3 py-2 text-xs font-semibold text-[#3D0C11] text-right">
                    Specialist bees
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.keystonePerennials.map((p, i) => (
                  <tr
                    key={p.genus}
                    className={i % 2 === 0 ? 'bg-white' : 'bg-[#fafdf6]'}
                  >
                    <td className="px-3 py-2 text-[#3D0C11] italic font-medium">{p.genus}</td>
                    <td className="px-3 py-2 text-[#6b5b5d]">{p.common}</td>
                    <td className="px-3 py-2 text-right font-semibold text-[#BF6900]">
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
          <h2 className="text-lg font-bold text-[#3D0C11] font-[var(--font-figtree)]">
            Native Plants in the Directory
          </h2>
          {plants.length > 0 && (
            <p className="text-sm text-[#6b5b5d]">
              {plants.length} plant{plants.length !== 1 ? 's' : ''} listed
            </p>
          )}
        </div>

        {plants.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-[#e8f5d8] rounded-sm space-y-2">
            <p className="text-sm font-medium text-[#3D0C11]">
              No plants in the directory for this region yet.
            </p>
            <p className="text-sm text-[#6b5b5d]">
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
      <div className="border border-[#e8f5d8] rounded-sm px-5 py-4 bg-[#f8fef3] text-sm text-[#6b5b5d] space-y-1">
        <p>
          <span className="font-medium text-[#3D0C11]">Data source:</span> Keystone plant rankings
          based on{' '}
          <a
            href="https://www.nwf.org/Native-Plant-Habitats/Plant-Native/Why-Native/Keystone-Plants-by-Ecoregion"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#3D0C11]"
          >
            NWF Keystone Plants by Ecoregion
          </a>{' '}
          and Narango, Tallamy &amp; Shropshire (2020),{' '}
          <em>Nature Communications</em>. Specialist bee data from Fowler (2016), USDA Forest Service.
        </p>
      </div>

      {/* CTA — zip search */}
      <div className="border-t border-[#e8f5d8] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[#3D0C11]">
            Get results for your specific location
          </p>
          <p className="text-sm text-[#6b5b5d]">
            Enter your zip code for a ranked list filtered to your exact ecoregion and growing
            conditions.
          </p>
        </div>
        <Link
          href="/search"
          className="shrink-0 inline-block bg-[#3D0C11] text-white text-sm font-medium px-5 py-2.5 rounded-sm hover:bg-[#2d0a0d] transition-colors"
        >
          Search by zip →
        </Link>
      </div>
    </div>
  )
}
