import type { MetadataRoute } from 'next'
import { ECOREGION_GROUP_META } from '@/lib/ecoregions'

export const dynamic = 'force-dynamic'

const BASE = 'https://www.keystonenurseries.com'

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
]

const CA_PROVINCES = ['BC','AB','SK','MB','ON','QC','NB','NS','PE','NL','YT','NT','NU']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/nurseries`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/plants`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/ecoregions`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/resources/keystone-species`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/resources/top-20-keystone-plants`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/quiz`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/plant-spacing-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/states`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/canada`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.1 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.1 },
  ]

  // Static: ecoregion groups
  const ecoregionPages: MetadataRoute.Sitemap = ECOREGION_GROUP_META.map((g) => ({
    url: `${BASE}/ecoregions/${g.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Static: US state pages
  const statePages: MetadataRoute.Sitemap = US_STATES.map((s) => ({
    url: `${BASE}/states/${s.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  // Static: Canadian province pages
  const provincePages: MetadataRoute.Sitemap = CA_PROVINCES.map((p) => ({
    url: `${BASE}/canada/${p.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  // Dynamic pages from Payload CMS
  let dynamicPages: MetadataRoute.Sitemap = []
  try {
    const { getPayload } = await import('payload')
    const config = (await import('@payload-config')).default
    const payload = await getPayload({ config })

    // Nurseries
    const { docs: nurseries } = await payload.find({
      collection: 'nurseries',
      limit: 1000,
      select: { slug: true },
    })
    const nurseryPages: MetadataRoute.Sitemap = nurseries.map((n) => ({
      url: `${BASE}/nurseries/${n.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Plants
    const { docs: plants } = await payload.find({
      collection: 'plants',
      limit: 500,
      select: { slug: true },
    })
    const plantPages: MetadataRoute.Sitemap = plants.map((p) => ({
      url: `${BASE}/plants/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    // Blog posts
    const { docs: posts } = await payload.find({
      collection: 'posts',
      limit: 200,
      select: { slug: true, publishedAt: true },
    })
    const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    dynamicPages = [...nurseryPages, ...plantPages, ...postPages]
  } catch {
    // Database not available (e.g. during build) — static pages only
  }

  return [...staticPages, ...ecoregionPages, ...statePages, ...provincePages, ...dynamicPages]
}
