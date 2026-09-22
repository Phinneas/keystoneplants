/**
 * Single source of truth for the plant directory's filter vocabulary.
 *
 * Every `value` must exist in the matching Plants collection select options —
 * getPlants() filters with an exact match, so a value that drifts from the
 * collection silently returns zero results. The parity test in
 * tests/int/plant-facets.int.spec.ts enforces this.
 */

export interface FacetOption {
  value: string
  label: string
}

export const WILDLIFE_OPTIONS: FacetOption[] = [
  { value: 'caterpillar-host', label: 'Butterflies & moths' },
  { value: 'pollinator-plant', label: 'Bees & pollinators' },
  { value: 'bird-food', label: 'Birds' },
  { value: 'nesting-material', label: 'Nesting material' },
  { value: 'cover', label: 'Wildlife cover' },
]

export const SUN_OPTIONS: FacetOption[] = [
  { value: 'full-sun', label: 'Full sun' },
  { value: 'part-shade', label: 'Part shade' },
  { value: 'full-shade', label: 'Full shade' },
]

export const MOISTURE_OPTIONS: FacetOption[] = [
  { value: 'dry', label: 'Dry' },
  { value: 'medium', label: 'Medium' },
  { value: 'wet', label: 'Wet' },
]

export const TYPE_OPTIONS: FacetOption[] = [
  { value: 'tree', label: 'Tree' },
  { value: 'shrub', label: 'Shrub' },
  { value: 'perennial', label: 'Perennial' },
  { value: 'grass', label: 'Grass' },
  { value: 'vine', label: 'Vine' },
  { value: 'fern', label: 'Fern' },
  { value: 'annual', label: 'Annual' },
]
