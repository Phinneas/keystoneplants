import type { Metadata } from 'next'
import Link from 'next/link'
import { ECOREGION_GROUP_META } from '@/lib/ecoregions'

export const metadata: Metadata = {
  title: 'Keystone Plants by Ecoregion',
  description:
    'Find the native keystone plants for your ecoregion. Browse the top genera for caterpillar and specialist bee support across 9 regions of the United States.',
}

export default function EcoregionsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">

      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="text-xs font-medium text-[#6b5b5d] uppercase tracking-widest">
          Regional Guides
        </div>
        <h1 className="text-3xl font-bold text-[#3D0C11] font-[var(--font-figtree)]">
          Keystone Plants by Ecoregion
        </h1>
        <p className="text-base text-[#6b5b5d] leading-relaxed">
          Native plants and the insects that depend on them co-evolved over thousands of years —
          which means the right keystone plants for your yard depend on where you live. Select your
          region below for the top genera, keystone species data, and plant recommendations.
        </p>
        <p className="text-sm text-[#6b5b5d]">
          Want results by zip code?{' '}
          <Link
            href="/search"
            className="text-[#BF6900] underline underline-offset-2 hover:text-[#CC5500] transition-colors"
          >
            Use the Native Plant Finder →
          </Link>
        </p>
      </div>

      {/* Region grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ECOREGION_GROUP_META.map((group) => {
          const ecoCount = group.keystoneTrees.length + group.keystonePerennials.length
          return (
            <Link
              key={group.slug}
              href={`/ecoregions/${group.slug}`}
              className="group block rounded-sm border border-[#e8f5d8] bg-white p-5 hover:border-[#BF6900] hover:shadow-sm transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-base font-bold text-[#3D0C11] font-[var(--font-figtree)] group-hover:text-[#BF6900] transition-colors">
                    {group.name}
                  </h2>
                  <span className="shrink-0 text-xs text-[#6b5b5d] border border-[#e8f5d8] rounded-sm px-1.5 py-0.5">
                    {ecoCount} keystones
                  </span>
                </div>
                <p className="text-xs text-[#6b5b5d]">{group.states}</p>
                <p className="text-sm text-[#3D0C11] leading-relaxed line-clamp-3">
                  {group.summary}
                </p>
                <div className="pt-1 flex flex-wrap gap-1">
                  {group.keystoneTrees.slice(0, 2).map((t) => (
                    <span
                      key={t.genus}
                      className="text-xs px-2 py-0.5 rounded-sm bg-[#f8fef3] border border-[#e8f5d8] text-[#3D0C11] italic"
                    >
                      {t.genus}
                    </span>
                  ))}
                  {group.keystonePerennials.slice(0, 1).map((p) => (
                    <span
                      key={p.genus}
                      className="text-xs px-2 py-0.5 rounded-sm bg-[#fef8ec] border border-[#f5d48a] text-[#3D0C11] italic"
                    >
                      {p.genus}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* What is a keystone plant? */}
      <div className="border-t border-[#e8f5d8] pt-8 max-w-2xl space-y-3">
        <h2 className="text-lg font-bold text-[#3D0C11] font-[var(--font-figtree)]">
          What makes a plant a keystone species?
        </h2>
        <p className="text-sm text-[#6b5b5d] leading-relaxed">
          Research by Dr. Doug Tallamy at the University of Delaware found that just 14% of native
          plant genera support 90% of butterfly and moth caterpillar species in any given region.
          These are the keystones — the plants that do the heavy lifting for the food web. A separate
          analysis by Jarrod Fowler identified the native plant genera on which pollen specialist
          bees depend exclusively.
        </p>
        <p className="text-sm text-[#6b5b5d] leading-relaxed">
          The data on each regional page comes directly from the{' '}
          <a
            href="https://www.nwf.org/Native-Plant-Habitats/Plant-Native/Why-Native/Keystone-Plants-by-Ecoregion"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#3D0C11]"
          >
            NWF Keystone Plants by Ecoregion program
          </a>
          , which publishes ranked plant lists for each major US ecoregion.
        </p>
      </div>
    </div>
  )
}
