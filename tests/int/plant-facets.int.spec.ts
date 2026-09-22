import { describe, it, expect } from 'vitest'
import { Plants } from '@/collections/Plants'
import {
  MOISTURE_OPTIONS,
  SUN_OPTIONS,
  TYPE_OPTIONS,
  WILDLIFE_OPTIONS,
} from '@/lib/plant-facets'
import { ECOREGIONS, ECOREGION_GROUP_META, getNativeRegionsForCodes } from '@/lib/ecoregions'
import { getPlants } from '@/lib/plants'

function selectOptions(fieldName: string): string[] {
  const field = Plants.fields.find((f) => 'name' in f && f.name === fieldName)
  if (!field || field.type !== 'select') throw new Error(`${fieldName} is not a select field`)
  return field.options.map((o) => (typeof o === 'string' ? o : o.value))
}

describe('filter vocabulary parity', () => {
  const facets = [
    { fieldName: 'plantType', options: TYPE_OPTIONS },
    { fieldName: 'sunRequirement', options: SUN_OPTIONS },
    { fieldName: 'moistureRequirement', options: MOISTURE_OPTIONS },
    { fieldName: 'wildlifeValue', options: WILDLIFE_OPTIONS },
  ]

  it.each(facets)('every $fieldName facet value exists in the Plants collection', ({ fieldName, options }) => {
    const allowed = selectOptions(fieldName)
    const drifted = options.map((o) => o.value).filter((v) => !allowed.includes(v))
    expect(drifted).toEqual([])
  })

  it('every ecoregion group maps to a real nativeRegions value', () => {
    const allowed = selectOptions('nativeRegions')
    const drifted = ECOREGION_GROUP_META.map((g) => g.nativeRegion).filter(
      (r) => !allowed.includes(r),
    )
    expect(drifted).toEqual([])
  })

  it('every ecoregion belongs to a group that maps to a region', () => {
    const groupNames = new Set(ECOREGION_GROUP_META.map((g) => g.name))
    const orphans = ECOREGIONS.filter((e) => !groupNames.has(e.region)).map(
      (e) => `${e.code} (${e.region})`,
    )
    expect(orphans).toEqual([])
  })
})

describe('getNativeRegionsForCodes', () => {
  it('resolves a code to its group region', () => {
    expect(getNativeRegionsForCodes(['8.1.1'])).toEqual(['northeast'])
  })

  it('deduplicates codes whose groups share a region', () => {
    // 8.1.1 is Northeast and 8.1.5 is Mid-Atlantic; both map to northeast.
    expect(getNativeRegionsForCodes(['8.1.1', '8.1.5'])).toEqual(['northeast'])
  })

  it('ignores unknown codes', () => {
    expect(getNativeRegionsForCodes(['not-a-code', '8.1.1'])).toEqual(['northeast'])
  })

  it('maps California codes to california rather than northwest', () => {
    const california = ECOREGIONS.find((e) => e.region === 'California')
    expect(california).toBeDefined()
    expect(getNativeRegionsForCodes([california!.code])).toEqual(['california'])
  })
})

describe('getPlants filters', () => {
  it('treats a single string and a one-item array identically', async () => {
    const single = await getPlants({ plantType: 'tree' })
    const array = await getPlants({ plantType: ['tree'] })
    expect(array.map((p) => p.id)).toEqual(single.map((p) => p.id))
  })

  it('ORs values within a facet', async () => {
    const trees = await getPlants({ plantType: 'tree' })
    const both = await getPlants({ plantType: ['tree', 'perennial'] })
    const ids = new Set(both.map((p) => p.id))

    expect(trees.every((p) => ids.has(p.id))).toBe(true)
    expect(both.length).toBeGreaterThanOrEqual(trees.length)
  })

  it('ANDs across facets', async () => {
    const trees = await getPlants({ plantType: 'tree' })
    const filtered = await getPlants({ plantType: 'tree', wildlifeValue: 'bird-food' })

    expect(filtered.every((p) => p.wildlifeValue.includes('bird-food'))).toBe(true)
    expect(filtered.every((p) => trees.some((t) => t.id === p.id))).toBe(true)
  })

  it('still filters on a valid value no plant carries', async () => {
    const all = await getPlants()
    const used = new Set(all.map((p) => p.plantType))
    const unused = selectOptions('plantType').find((t) => !used.has(t))

    if (unused) expect(await getPlants({ plantType: [unused] })).toEqual([])
  })
})
