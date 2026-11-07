import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ZipSearchForm } from '@/components/ZipSearchForm'
import { FilterPanel } from '@/components/FilterPanel'
import { PlantCard } from '@/components/PlantCard'
import { getRegionsForZip, isValidZip } from '@/lib/regions'
import { getNativeRegionsForCodes } from '@/lib/ecoregions'
import { getPlants } from '@/lib/plants'

export const dynamic = 'force-dynamic'

interface SearchPageProps {
  searchParams: Promise<{
    zip?: string
    sun?: string | string[]
    moisture?: string | string[]
    type?: string | string[]
    wildlife?: string | string[]
  }>
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams
  return {
    title: params.zip ? `Native plants near ${params.zip}` : 'Browse native plants',
  }
}

function asArray(val: string | string[] | undefined): string[] {
  if (!val) return []
  return Array.isArray(val) ? val : [val]
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const zip = params.zip ?? ''

  let regionError: string | null = null
  let plants: Awaited<ReturnType<typeof getPlants>> = []
  let regionInfo: { state: string; hardinessZone: number | null } | null = null
  let regionHasPlants = true

  if (zip) {
    if (!isValidZip(zip)) {
      regionError = "That doesn't look like a valid zip code."
    } else {
      const region = await getRegionsForZip(zip)
      if (!region) {
        regionError = `No region data for zip code ${zip} yet.`
      } else {
        regionInfo = { state: region.state, hardinessZone: region.hardinessZone }
        // A zip with no ecoregion data resolves to no region filter rather than
        // an empty result set — missing data shouldn't hide plants.
        const nativeRegion = getNativeRegionsForCodes(region.ecoregions)
        plants = await getPlants({
          plantType: asArray(params.type),
          sunRequirement: asArray(params.sun),
          moistureRequirement: asArray(params.moisture),
          wildlifeValue: asArray(params.wildlife),
          nativeRegion,
        })
        if (plants.length === 0 && nativeRegion.length > 0) {
          regionHasPlants = (await getPlants({ nativeRegion })).length > 0
        }
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-[var(--kn-ink)]">
          {zip && !regionError
            ? `Native plants near ${zip}${regionInfo ? ` · ${regionInfo.state}` : ''}`
            : 'Find native plants'}
        </h1>
        <ZipSearchForm defaultZip={zip} />
        {regionError && <p className="text-red-600 text-sm">{regionError}</p>}
      </div>

      {zip && !regionError && (
        <div className="flex gap-8">
          <Suspense>
            <FilterPanel zip={zip} />
          </Suspense>

          <div className="flex-1">
            {plants.length === 0 ? (
              <p className="text-[var(--kn-muted)] py-12 text-center">
                {regionHasPlants ? (
                  'No plants match your current filters. Try broadening your search.'
                ) : (
                  <>
                    No plants are tagged for this region yet — the directory is still growing.{' '}
                    <Link href="/plants" className="underline">
                      Browse all plants
                    </Link>
                  </>
                )}
              </p>
            ) : (
              <>
                <p className="text-sm text-[var(--kn-muted)] mb-4">
                  {plants.length} plant{plants.length !== 1 ? 's' : ''} found
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {plants.map((plant) => (
                    <PlantCard key={plant.id} {...plant} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
