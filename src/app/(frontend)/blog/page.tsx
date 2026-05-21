import type { Metadata } from 'next'
import Link from 'next/link'
import { getPosts } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Guides, species spotlights, and conservation stories from the Keystone Nurseries community.',
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#3D0C11] font-[var(--font-figtree)]">
          From the field
        </h1>
        <p className="text-[#6b5b5d]">
          Guides, species spotlights, and stories from the native plant community.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-[#6b5b5d]">Posts coming soon.</p>
      ) : (
        <div className="divide-y divide-[#e8f5d8]">
          {posts.map((post) => (
            <article key={post.id} className="py-8 space-y-3">
              <h2 className="text-xl font-bold text-[#3D0C11] font-[var(--font-figtree)] leading-snug">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:underline decoration-[#DDFC74] decoration-2 underline-offset-2"
                >
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && <p className="text-[#6b5b5d] leading-relaxed">{post.excerpt}</p>}
              <div className="flex items-center justify-between">
                {post.publishedAt && (
                  <time className="text-sm text-[#6b5b5d]">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium text-[#BF6900] hover:text-[#CC5500] transition-colors"
                >
                  Read →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
