import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { getPostBySlug } from "@/lib/posts";
import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";

export const dynamic = 'force-dynamic'

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 space-y-8">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt ?? undefined,
        url: `https://www.keystonenurseries.com/blog/${post.slug}`,
        datePublished: post.publishedAt ?? undefined,
        dateModified: post.updatedAt ?? post.publishedAt ?? undefined,
        ...(post.authorName && {
          author: {
            "@type": "Person",
            name: post.authorName,
            ...(post.authorCredentials && { description: post.authorCredentials }),
          },
        }),
        publisher: {
          "@type": "Organization",
          name: "Keystone Nurseries",
          url: "https://www.keystonenurseries.com",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://www.keystonenurseries.com/blog/${post.slug}`,
        },
      }} />
      <Link
        href="/blog"
        className="text-sm text-[var(--kn-muted)] hover:text-[var(--kn-ink)] transition-colors"
      >
        ← From the field
      </Link>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[var(--kn-ink)] font-[var(--font-figtree)] leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--kn-muted)]">
          {post.authorName && (
            <span className="font-medium text-[var(--kn-ink)]">
              {post.authorName}
              {post.authorCredentials && <span className="font-normal"> — {post.authorCredentials}</span>}
            </span>
          )}
          {post.publishedAt && (
            <>
              {post.authorName && <span aria-hidden="true">·</span>}
              <time>
                {post.updatedAt ? "Updated " : ""}
                {new Date(post.updatedAt ?? post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </>
          )}
        </div>
      </div>

      <div
        className="prose prose-stone max-w-none text-[var(--kn-ink)] prose-headings:font-[var(--font-figtree)] prose-headings:text-[var(--kn-ink)] prose-a:text-[var(--kn-ochre)] prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: convertLexicalToHTML({ data: post.body }) }}
      />
    </div>
  );
}
