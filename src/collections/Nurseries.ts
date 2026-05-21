import type { CollectionConfig } from 'payload'

export const Nurseries: CollectionConfig = {
  slug: 'nurseries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'state', 'isNativeOnly', 'verified'],
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'name', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'address', type: 'text' },
    { name: 'city', type: 'text', required: true },
    { name: 'state', type: 'text', required: true, index: true },
    { name: 'zip', type: 'text', required: true },
    { name: 'website', type: 'text' },
    { name: 'phone', type: 'text' },
    {
      name: 'isNativeOnly',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'specialties',
      type: 'select',
      hasMany: true,
      options: [
        'trees', 'shrubs', 'perennials', 'grasses', 'prairie',
        'pollinators', 'wetland', 'ferns', 'vines',
      ],
    },
    {
      name: 'photos',
      type: 'array',
      fields: [{ name: 'url', type: 'text', required: true }],
    },
    { name: 'lat', type: 'number' },
    { name: 'lng', type: 'number' },
    { name: 'verified', type: 'checkbox', defaultValue: false },
  ],
}
