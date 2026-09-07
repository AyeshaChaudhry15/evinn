
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
    <main className="bg-[#0b0f14] text-white min-h-screen">

      <section className="max-w-5xl mx-auto px-6 py-14">

        <Link
          href="/blog"
          className="text-lime-300 text-sm hover:underline"
        >
          ← Back to all articles
        </Link>


        <h1 className="text-3xl sm:text-4xl font-bold mt-4">
          {post.title}
        </h1>

        <p className="text-gray-400 mt-2">
          {post.date}
        </p>

        <div className="relative h-72 sm:h-96 w-full mt-6 rounded-2xl overflow-hidden">

          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />

        </div>

        <div className="mt-8 space-y-4 text-gray-300 leading-relaxed">
          {post.content.map((para, i) => (
            <p key={i}>
              {para}
            </p>
          ))}
        </div>

      </section>

      {related.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-14">

          <h2 className="text-2xl font-bold mb-6">
            Related Articles
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">

            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="block bg-[#12181f] rounded-xl overflow-hidden border border-white/5 hover:border-lime-400/40 transition"
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

                  <p className="text-xs text-gray-400 mt-1">
                    {r.date}
                  </p>

                </div>

              </Link>
            ))}

          </div>

        </section>
      )}

    </main>
  );
}

