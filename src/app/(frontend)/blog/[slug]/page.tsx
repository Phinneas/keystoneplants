import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getPostBySlug } from "@/lib/posts";

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
      <Link
        href="/blog"
        className="text-sm text-[#6b5b5d] hover:text-[#3D0C11] transition-colors"
      >
        ← From the field
      </Link>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[#3D0C11] font-[var(--font-figtree)] leading-tight">
          {post.title}
        </h1>

        {post.publishedAt && (
          <time className="block text-sm text-[#6b5b5d]">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        )}
      </div>

      <div
        className="prose prose-stone max-w-none text-[#3D0C11] prose-headings:font-[var(--font-figtree)] prose-headings:text-[#3D0C11] prose-a:text-[#BF6900] prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </div>
  );
}
