import { getPayload } from 'payload'
import config from '@payload-config'
import { haversine } from './distance'

export interface ParsedNursery {
  id: string
  slug: string
  name: string
  description: string | null
  address: string | null
  city: string
  state: string
  zip: string
  website: string | null
  phone: string | null
  isNativeOnly: boolean
  specialties: string[]
  photos: string[]
  lat: number | null
  lng: number | null
  verified: boolean
  distanceMiles?: number
}

export interface NurseryFilters {
  nativeOnly?: boolean
  specialty?: string
}

function adapt(doc: Record<string, any>): ParsedNursery {
  return {
    id: String(doc.id),
    slug: doc.slug,
    name: doc.name,
    description: doc.description ?? null,
    address: doc.address ?? null,
    city: doc.city,
    state: doc.state,
    zip: doc.zip,
    website: doc.website ?? null,
    phone: doc.phone ?? null,
    isNativeOnly: Boolean(doc.isNativeOnly),
    specialties: Array.isArray(doc.specialties) ? doc.specialties : [],
    photos: Array.isArray(doc.photos) ? doc.photos.map((p: any) => p.url ?? p) : [],
    lat: doc.lat ?? null,
    lng: doc.lng ?? null,
    verified: Boolean(doc.verified),
  }
}

export async function getNurseriesByState(
  state: string,
  filters: NurseryFilters = {},
): Promise<ParsedNursery[]> {
  const payload = await getPayload({ config })
  const where: Record<string, any> = { state: { equals: state.toUpperCase() } }
  if (filters.nativeOnly) where.isNativeOnly = { equals: true }

  const { docs } = await payload.find({
    collection: 'nurseries',
    where,
    limit: 200,
    sort: 'name',
  })

  let nurseries = docs.map(adapt)
  if (filters.specialty) {
    nurseries = nurseries.filter((n) => n.specialties.includes(filters.specialty!))
  }
  return nurseries
}

export async function getNurseriesNearZip(
  userLat: number,
  userLng: number,
  radiusMiles = 100,
  filters: NurseryFilters = {},
): Promise<ParsedNursery[]> {
  const payload = await getPayload({ config })
  const where: Record<string, any> = {}
  if (filters.nativeOnly) where.isNativeOnly = { equals: true }

  const { docs } = await payload.find({
    collection: 'nurseries',
    where,
    limit: 500,
    sort: 'name',
  })

  let nurseries = docs
    .map(adapt)
    .filter((n) => n.lat !== null && n.lng !== null)
    .map((n) => ({ ...n, distanceMiles: haversine(userLat, userLng, n.lat!, n.lng!) }))
    .filter((n) => n.distanceMiles! <= radiusMiles)
    .sort((a, b) => a.distanceMiles! - b.distanceMiles!)

  if (filters.specialty) {
    nurseries = nurseries.filter((n) => n.specialties.includes(filters.specialty!))
  }
  return nurseries
}

export async function getNurseryBySlug(slug: string): Promise<ParsedNursery | null> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'nurseries',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ? adapt(docs[0]) : null
}
