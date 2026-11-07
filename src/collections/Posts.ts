import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'authorName', 'publishedAt', 'updatedAt'],
  },
  fields: [
    { name: 'slug', type: 'text', required: true, unique: true, index: true },
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'textarea' },
    {
      name: 'body',
      type: 'richText',
      required: true,
      editor: lexicalEditor({}),
    },
    { name: 'authorName', type: 'text', label: 'Author name' },
    { name: 'authorCredentials', type: 'text', label: 'Author credentials (e.g. "Horticulturist, Penn State Extension")' },
    { name: 'publishedAt', type: 'date', index: true },
    { name: 'updatedAt', type: 'date', label: 'Last updated (shown as "Updated" date; leave blank to use publish date)' },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
