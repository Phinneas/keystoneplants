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
  updatedAt: string | null
}

const PLANT_TYPE_LABELS: Record<string, string> = {
  tree: 'native tree',
  shrub: 'native shrub',
  perennial: 'native perennial',
  grass: 'native grass',
  fern: 'native fern',
  vine: 'native vine',
  annual: 'native annual',
}

const SUN_LABELS: Record<string, string> = {
  'full-sun': 'full sun',
  'part-shade': 'part shade',
  'full-shade': 'full shade',
}

const MOISTURE_LABELS: Record<string, string> = {
  dry: 'dry soil',
  medium: 'medium moisture',
  wet: 'wet soil',
  adaptable: 'adaptable moisture',
}

const WILDLIFE_VERBS: Record<string, string> = {
  'caterpillar-host': 'caterpillar host plant',
  'pollinator-plant': 'pollinator plant',
  'bird-food': 'bird food source',
  'nesting-material': 'nesting material source',
  cover: 'wildlife cover',
}

/**
 * Compose a self-contained definition sentence from a plant's structured data.
 * Designed to be extractable by AI systems as a standalone snippet.
 * Target: 40–60 words, factual, no marketing language.
 */
export function buildPlantDefinition(plant: ParsedPlant): string {
  const parts: string[] = []

  // Opening: "Milkweed (Asclepias) is a native perennial"
  const type = plant.plantType ? PLANT_TYPE_LABELS[plant.plantType] ?? 'native plant' : 'native plant'
  parts.push(`${plant.commonName} (${plant.scientificName}) is a ${type}`)

  // Height
  if (plant.heightInFeetMin && plant.heightInFeetMax) {
    parts.push(`growing ${plant.heightInFeetMin}–${plant.heightInFeetMax} feet tall`)
  } else if (plant.heightInFeetMax) {
    parts.push(`growing up to ${plant.heightInFeetMax} feet tall`)
  }

  // Hardiness zones
  if (plant.hardinessZoneMin && plant.hardinessZoneMax) {
    parts.push(`suitable for USDA hardiness zones ${plant.hardinessZoneMin}–${plant.hardinessZoneMax}`)
  }

  // Growing conditions
  const conditions: string[] = []
  if (plant.sunRequirement) conditions.push(SUN_LABELS[plant.sunRequirement] ?? plant.sunRequirement)
  if (plant.moistureRequirement) conditions.push(MOISTURE_LABELS[plant.moistureRequirement] ?? plant.moistureRequirement)
  if (conditions.length > 0) {
    parts.push(`thriving in ${conditions.join(' and ')}`)
  }

  // Ecological value
  if (plant.wildlifeValue.length > 0) {
    const roles = plant.wildlifeValue.map((w) => WILDLIFE_VERBS[w] ?? w)
    if (roles.length === 1) {
      parts.push(`It serves as a ${roles[0]}`)
    } else {
      const last = roles.pop()
      parts.push(`It serves as a ${roles.join(', ')}, and ${last}`)
    }
  }

  return parts.join('. ') + '.'
}

/**
 * Filter values must match the Plants collection select options exactly.
 * Each facet accepts one value or many: values within a facet are OR'd, and
 * facets are AND'd together.
 */
export interface PlantFilters {
  plantType?: string | string[]
  sunRequirement?: string | string[]
  moistureRequirement?: string | string[]
  wildlifeValue?: string | string[]
  nativeRegion?: string | string[]
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
    updatedAt: doc.updatedAt ?? null,
  }
}

function asValueList(value?: string | string[]): string[] {
  if (!value) return []
  return Array.isArray(value) ? value.filter(Boolean) : [value]
}

export async function getPlants(filters: PlantFilters = {}): Promise<ParsedPlant[]> {
  const payload = await getPayload({ config })
  const where: Record<string, any> = {}
  const plantType = asValueList(filters.plantType)
  const sunRequirement = asValueList(filters.sunRequirement)
  const moistureRequirement = asValueList(filters.moistureRequirement)
  const wildlifeValue = asValueList(filters.wildlifeValue)
  const nativeRegion = asValueList(filters.nativeRegion)

  if (plantType.length) where.plantType = { in: plantType }
  if (sunRequirement.length) where.sunRequirement = { in: sunRequirement }
  if (moistureRequirement.length) where.moistureRequirement = { in: moistureRequirement }
  if (wildlifeValue.length) where.wildlifeValue = { in: wildlifeValue }
  if (nativeRegion.length) where.nativeRegions = { in: nativeRegion }

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
