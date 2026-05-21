import { getPayload } from 'payload'
import config from '@payload-config'

export interface ZipRegion {
  zip: string
  state: string
  ecoregions: string[]
  hardinessZone: number | null
  lat: number | null
  lng: number | null
}

export function isValidZip(zip: string): boolean {
  return /^\d{5}$/.test(zip)
}

export async function getRegionsForZip(zip: string): Promise<ZipRegion | null> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'zip-regions',
    where: { zip: { equals: zip } },
    limit: 1,
  })
  if (!docs[0]) return null
  const doc = docs[0] as Record<string, any>
  return {
    zip: doc.zip,
    state: doc.state,
    ecoregions: Array.isArray(doc.ecoregions) ? doc.ecoregions.map((e: any) => e.code ?? e) : [],
    hardinessZone: doc.hardinessZone ?? null,
    lat: doc.lat ?? null,
    lng: doc.lng ?? null,
  }
}
