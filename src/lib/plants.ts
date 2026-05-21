import { getPayload } from 'payload'
import config from '@payload-config'

export interface ParsedPlant {
  id: string
  slug: string
  commonName: string
  scientificName: string
  description: string | null
  plantType: string | null
  hardinessZoneMin: number | null
  hardinessZoneMax: number | null
  heightInFeetMin: number | null
  heightInFeetMax: number | null
  sunRequirement: string | null
  moistureRequirement: string | null
  nativeRegions: string[]
  wildlifeValue: string[]
  photos: string[]
}

export interface PlantFilters {
  plantType?: string
  sunRequirement?: string
  moistureRequirement?: string
  wildlifeValue?: string
  nativeRegion?: string
}

function adapt(doc: Record<string, any>): ParsedPlant {
  return {
    id: String(doc.id),
    slug: doc.slug,
    commonName: doc.commonName,
    scientificName: doc.scientificName,
    description: doc.description ?? null,
    plantType: doc.plantType ?? null,
    hardinessZoneMin: doc.hardinessZoneMin ?? null,
    hardinessZoneMax: doc.hardinessZoneMax ?? null,
    heightInFeetMin: doc.heightInFeetMin ?? null,
    heightInFeetMax: doc.heightInFeetMax ?? null,
    sunRequirement: doc.sunRequirement ?? null,
    moistureRequirement: doc.moistureRequirement ?? null,
    nativeRegions: Array.isArray(doc.nativeRegions) ? doc.nativeRegions : [],
    wildlifeValue: Array.isArray(doc.wildlifeValue) ? doc.wildlifeValue : [],
    photos: Array.isArray(doc.photos) ? doc.photos.map((p: any) => p.url ?? p) : [],
  }
}

export async function getPlants(filters: PlantFilters = {}): Promise<ParsedPlant[]> {
  const payload = await getPayload({ config })
  const where: Record<string, any> = {}
  if (filters.plantType) where.plantType = { equals: filters.plantType }
  if (filters.sunRequirement) where.sunRequirement = { equals: filters.sunRequirement }
  if (filters.moistureRequirement) where.moistureRequirement = { equals: filters.moistureRequirement }
  if (filters.wildlifeValue) where.wildlifeValue = { contains: filters.wildlifeValue }
  if (filters.nativeRegion) where.nativeRegions = { contains: filters.nativeRegion }

  const { docs } = await payload.find({
    collection: 'plants',
    where,
    limit: 200,
    sort: 'commonName',
  })
  return docs.map(adapt)
}

export async function getPlantBySlug(slug: string): Promise<ParsedPlant | null> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'plants',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ? adapt(docs[0]) : null
}
