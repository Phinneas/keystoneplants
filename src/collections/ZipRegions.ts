import type { CollectionConfig } from 'payload'

export const ZipRegions: CollectionConfig = {
  slug: 'zip-regions',
  admin: {
    useAsTitle: 'zip',
    defaultColumns: ['zip', 'state', 'hardinessZone'],
  },
  fields: [
    { name: 'zip', type: 'text', required: true, unique: true, index: true },
    { name: 'state', type: 'text', required: true, index: true },
    {
      name: 'ecoregions',
      type: 'array',
      fields: [{ name: 'code', type: 'text', required: true }],
    },
    { name: 'hardinessZone', type: 'number' },
    { name: 'lat', type: 'number' },
    { name: 'lng', type: 'number' },
  ],
}
