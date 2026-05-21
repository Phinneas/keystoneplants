import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PlantDirectoryFilters } from '@/components/PlantDirectoryFilters'
import { PlantCard } from '@/components/PlantCard'
import { getPlants } from '@/lib/plants'
import { getEcoregionByCode } from '@/lib/ecoregions'

export const metadata: Metadata = {
  title: 'Native Plant Directory',
  description: 'Browse native plants by ecoregion, wildlife value, and growing conditions.',
}

interface PlantsPageProps {
  searchParams: Promise<{
    eco?: string | string[]
    wildlife?: string | string[]
    sun?: string | string[]
    moisture?: string | string[]
    type?: string | string[]
  }>
}

function asArray(val: string | string[] | undefined): string[] {
  if (!val) return []
  return Array.isArray(val) ? val : [val]
}

export default async function PlantsPage({ searchParams }: PlantsPageProps) {
  const params = await searchParams

  const plantType = asArray(params.type)[0]
  const sunRequirement = asArray(params.sun)[0]
  const moistureRequirement = asArray(params.moisture)[0]
  const wildlifeValue = asArray(params.wildlife)[0]

  const hasFilters = !!(plantType || sunRequirement || moistureRequirement || wildlifeValue)

  const plants = await getPlants({ plantType, sunRequirement, moistureRequirement, wildlifeValue })

  const ecoLabels = asArray(params.eco)
    .map((code) => getEcoregionByCode(code)?.name)
    .filter(Boolean)

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8 space-y-1">
        <h1 className="text-3xl font-bold text-[#3D0C11] font-[var(--font-figtree)]">
          Native Plant Directory
        </h1>
        <p className="text-[#6b5b5d]">
          {hasFilters
            ? ecoLabels.length
              ? `Showing plants native to ${ecoLabels.join(', ')}`
              : 'Filtered results'
            : 'All native plants in the database'}
        </p>
      </div>

      <div className="flex gap-10">
        <Suspense>
          <PlantDirectoryFilters />
        </Suspense>

        <div className="flex-1 min-w-0">
          {plants.length === 0 ? (
            <EmptyState hasFilters={hasFilters} />
          ) : (
            <>
              <p className="text-sm text-[#6b5b5d] mb-5">
                {plants.length} plant{plants.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {plants.map((plant) => (
                  <PlantCard key={plant.id} {...plant} />
                ))}
              </div>
            </>
          )}

          <div className="mt-12 rounded-sm border border-[#e8f5d8] bg-[#f8fef3] px-6 py-5">
            <p className="text-sm font-medium text-[#3D0C11] mb-1">More plants coming soon</p>
            <p className="text-sm text-[#6b5b5d]">
              The directory is actively being built out. All species are verified native to their
              listed regions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="py-20 text-center space-y-3">
      <p className="text-[#3D0C11] font-semibold text-lg">
        {hasFilters ? 'No plants match these filters yet.' : 'No plants in the database yet.'}
      </p>
      <p className="text-sm text-[#6b5b5d] max-w-sm mx-auto">
        {hasFilters
          ? 'Try removing a filter or two — the database is still growing.'
          : 'Plant data is being added. Check back soon.'}
      </p>
      {hasFilters && (
        <Link
          href="/plants"
          className="inline-block mt-2 text-sm text-[#BF6900] underline hover:text-[#CC5500] transition-colors"
        >
          Clear filters and browse all
        </Link>
      )}
    </div>
  )
}
