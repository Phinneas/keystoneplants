import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export const dynamic = 'force-dynamic'

export async function GET() {
  const sitemapPath = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..', '..', '..', '..', 'public', 'sitemap.xml',
  )

  try {
    const xml = fs.readFileSync(sitemapPath, 'utf-8')
    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    })
  } catch {
    return new Response('Sitemap not found', { status: 404 })
  }
}