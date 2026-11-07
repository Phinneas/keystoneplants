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
        <h1 className="text-3xl font-bold text-[var(--kn-ink)] font-[var(--font-figtree)]">
          From the field
        </h1>
        <p className="text-[var(--kn-muted)]">
          Guides, species spotlights, and stories from the native plant community.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-[var(--kn-muted)]">Posts coming soon.</p>
      ) : (
        <div className="divide-y divide-[#e8f5d8]">
          {posts.map((post) => (
            <article key={post.id} className="py-8 space-y-3">
              <h2 className="text-xl font-bold text-[var(--kn-green)] font-[var(--font-figtree)] leading-snug">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:underline decoration-[#DDFC74] decoration-2 underline-offset-2"
                >
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && <p className="text-[var(--kn-muted)] leading-relaxed">{post.excerpt}</p>}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2 gap-y-1 text-sm text-[var(--kn-muted)]">
                  {post.authorName && (
                    <span className="font-medium text-[var(--kn-ink)]">{post.authorName}</span>
                  )}
                  {post.publishedAt && (
                    <>
                      {post.authorName && <span aria-hidden="true">·</span>}
                      <time>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </>
                  )}
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium text-[var(--kn-ochre)] hover:text-[var(--kn-ochre-soft)] transition-colors"
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
