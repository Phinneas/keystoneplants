import type { Metadata } from 'next'
import { ZipSearchForm } from '@/components/ZipSearchForm'
import { NurseryCard } from '@/components/NurseryCard'
import { getRegionsForZip, isValidZip } from '@/lib/regions'
import { getNurseriesNearZip } from '@/lib/nurseries'

export const dynamic = 'force-dynamic'

interface NurserySearchPageProps {
  searchParams: Promise<{
    zip?: string
    native?: string
    specialty?: string
    radius?: string
  }>
}

export async function generateMetadata({ searchParams }: NurserySearchPageProps): Promise<Metadata> {
  const params = await searchParams
  return {
    title: params.zip ? `Native plant nurseries near ${params.zip}` : 'Find native plant nurseries',
  }
}

const SPECIALTY_OPTIONS = [
  'trees', 'shrubs', 'perennials', 'grasses', 'prairie',
  'pollinators', 'wetland', 'ferns', 'vines',
]

export default async function NurserySearchPage({ searchParams }: NurserySearchPageProps) {
  const params = await searchParams
  const zip = params.zip ?? ''
  const radiusMiles = Number(params.radius ?? 100)
  const nativeOnly = params.native === 'true'
  const specialty = params.specialty

  let error: string | null = null
  let nurseries: Awaited<ReturnType<typeof getNurseriesNearZip>> = []
  let regionInfo: { state: string } | null = null
  let userCoords: { lat: number; lng: number } | null = null

  if (zip) {
    if (!isValidZip(zip)) {
      error = "That doesn't look like a valid zip code."
    } else {
      const region = await getRegionsForZip(zip)
      if (!region) {
        error = `No region data for zip code ${zip} yet.`
      } else {
        regionInfo = { state: region.state }
        if (region.lat && region.lng) {
          userCoords = { lat: region.lat, lng: region.lng }
          nurseries = await getNurseriesNearZip(region.lat, region.lng, radiusMiles, {
            nativeOnly,
            specialty,
          })
        } else {
          error = `We don't have coordinates for zip code ${zip} yet.`
        }
      }
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-[#3D0C11]">
          {zip && !error
            ? `Native plant nurseries near ${zip}${regionInfo ? ` · ${regionInfo.state}` : ''}`
            : 'Find native plant nurseries'}
        </h1>
        <ZipSearchForm defaultZip={zip} action="/nurseries" />
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>

      {zip && !error && userCoords && (
        <div className="flex gap-8">
          <aside className="w-48 shrink-0 space-y-5 text-sm">
            <div>
              <p className="font-medium text-[#3D0C11] mb-2">Type</p>
              <div className="space-y-1.5">
                {[
                  { label: 'All nurseries', value: '' },
                  { label: 'Native only', value: 'true' },
                ].map(({ label, value }) => (
                  <a
                    key={value}
                    href={buildUrl(zip, { native: value, specialty, radius: String(radiusMiles) })}
                    className={`flex items-center gap-2 text-[#6b5b5d] hover:text-[#3D0C11] transition-colors ${
                      (value === 'true' ? nativeOnly : !nativeOnly) ? 'font-semibold text-[#3D0C11]' : ''
                    }`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="font-medium text-[#3D0C11] mb-2">Specialty</p>
              <div className="space-y-1.5">
                <a
                  href={buildUrl(zip, { native: nativeOnly ? 'true' : '', radius: String(radiusMiles) })}
                  className={`block text-[#6b5b5d] hover:text-[#3D0C11] transition-colors ${!specialty ? 'font-semibold text-[#3D0C11]' : ''}`}
                >
                  All
                </a>
                {SPECIALTY_OPTIONS.map((s) => (
                  <a
                    key={s}
                    href={buildUrl(zip, {
                      native: nativeOnly ? 'true' : '',
                      specialty: s,
                      radius: String(radiusMiles),
                    })}
                    className={`block capitalize text-[#6b5b5d] hover:text-[#3D0C11] transition-colors ${specialty === s ? 'font-semibold text-[#3D0C11]' : ''}`}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="font-medium text-[#3D0C11] mb-2">Radius</p>
              <div className="space-y-1.5">
                {[25, 50, 100, 200].map((r) => (
                  <a
                    key={r}
                    href={buildUrl(zip, {
                      native: nativeOnly ? 'true' : '',
                      specialty,
                      radius: String(r),
                    })}
                    className={`block text-[#6b5b5d] hover:text-[#3D0C11] transition-colors ${radiusMiles === r ? 'font-semibold text-[#3D0C11]' : ''}`}
                  >
                    {r} miles
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {nurseries.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <p className="text-[#3D0C11] font-medium">
                  No nurseries found within {radiusMiles} miles.
                </p>
                <p className="text-sm text-[#6b5b5d]">
                  Try expanding your radius or{' '}
                  <a href={buildUrl(zip, { radius: '200' })} className="underline hover:text-[#3D0C11]">
                    searching 200 miles
                  </a>
                  .
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-[#6b5b5d] mb-4">
                  {nurseries.length} nurseri{nurseries.length !== 1 ? 'es' : 'y'} within {radiusMiles} miles
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nurseries.map((nursery) => (
                    <NurseryCard key={nursery.id} {...nursery} />
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

function buildUrl(zip: string, params: Record<string, string | undefined>) {
  const p = new URLSearchParams({ zip })
  for (const [k, v] of Object.entries(params)) {
    if (v) p.set(k, v)
  }
  return `/nurseries?${p.toString()}`
}
