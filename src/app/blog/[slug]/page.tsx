import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/blogs";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = posts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white">
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div>
          <Link
            href="/blog"
            className="text-sm text-lime-300 hover:underline"
          >
            ← Back to all articles
          </Link>
        </div>

        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          {post.title}
        </h1>

        <p className="mt-2 text-gray-400">
          {post.date}
        </p>

        <div className="relative mt-6 h-72 w-full overflow-hidden rounded-2xl sm:h-96">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-8 space-y-4 leading-relaxed text-gray-300">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-14">
          <h2 className="mb-6 text-2xl font-bold">
            Related Articles
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <div key={r.slug}>
                <Link
                  href={`/blog/${r.slug}`}
                  className="block overflow-hidden rounded-xl border border-white/5 bg-[#12181f] transition hover:border-lime-400/40"
                >
                  <div className="relative h-32 w-full">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-3">
                    <p className="text-sm font-medium">
                      {r.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      {r.date}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}