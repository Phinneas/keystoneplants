import type { CollectionConfig } from 'payload'

export const Plants: CollectionConfig = {
  slug: 'plants',
  admin: {
    useAsTitle: 'commonName',
    defaultColumns: ['commonName', 'scientificName', 'plantType', 'hardinessZoneMin', 'hardinessZoneMax'],
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'commonName', type: 'text', required: true },
    { name: 'scientificName', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'plantType',
      type: 'select',
      options: ['tree', 'shrub', 'perennial', 'grass', 'fern', 'vine', 'annual'],
    },
    { name: 'hardinessZoneMin', type: 'number' },
    { name: 'hardinessZoneMax', type: 'number' },
    { name: 'heightInFeetMin', type: 'number' },
    { name: 'heightInFeetMax', type: 'number' },
    {
      name: 'sunRequirement',
      type: 'select',
      options: ['full-sun', 'part-shade', 'full-shade'],
    },
    {
      name: 'moistureRequirement',
      type: 'select',
      options: ['dry', 'medium', 'wet', 'adaptable'],
    },
    {
      name: 'nativeRegions',
      type: 'select',
      hasMany: true,
      options: [
        'northeast', 'southeast', 'midwest', 'great-plains',
        'southwest', 'northwest', 'mountain-west',
      ],
    },
    {
      name: 'wildlifeValue',
      type: 'select',
      hasMany: true,
      options: [
        'caterpillar-host', 'pollinator-plant', 'bird-food', 'nesting-material', 'cover',
      ],
    },
    {
      name: 'photos',
      type: 'array',
      fields: [{ name: 'url', type: 'text', required: true }],
    },
  ],
}
