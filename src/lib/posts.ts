import { getPayload } from 'payload'
import config from '@payload-config'

export interface ParsedPost {
  id: string
  slug: string
  title: string
  excerpt: string | null
  body: string
  publishedAt: string | null
}

function adapt(doc: Record<string, any>): ParsedPost {
  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt ?? null,
    body: doc.body,
    publishedAt: doc.publishedAt ?? null,
  }
}

export async function getPosts(): Promise<ParsedPost[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    limit: 100,
    sort: '-publishedAt',
  })
  return docs.map(adapt)
}

export async function getPostBySlug(slug: string): Promise<ParsedPost | null> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ? adapt(docs[0]) : null
}
