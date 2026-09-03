"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const posts = [
  {
    tag: "Industry News",
    title: "The Rise of Electric Bikes in Pakistan",
    date: "20 Aug 2024",
    image: "/blog1.avif",
    Link: "/blog1",
  },
  {
    tag: "Buying Guide",
    title: "How to Choose the Right Electric Scooter",
    date: "18 Aug 2024",
    image: "/blog2.webp",
    Link: "/blog2",
  },
  {
    tag: "Technology",
    title: "Future of Green Mobility in 2025",
    date: "15 Aug 2024",
    image: "/blog3.avif",
    Link: "/blog3",
  },
  {
    tag: "Sustainability",
    title: "Why EVs Are a Smarter Choice",
    date: "12 Aug 2024",
    image: "/blog4.avif",
    Link: "/blog4",
  },
  {
    tag: "Industry News",
    title: "EV Charging Infrastructure Growth",
    date: "10 Aug 2024",
    image: "/blog1.avif",
    Link: "/blog5",
  },
  {
    tag: "Buying Guide",
    title: "Battery Life: What You Need to Know",
    date: "8 Aug 2024",
    image: "/blog2.webp",
    Link: "/blog6",
  },
  {
    tag: "Technology",
    title: "Smart Features in Modern EVs",
    date: "5 Aug 2024",
    image: "/blog3.avif",
    Link: "/blog7",
  },
  {
    tag: "Sustainability",
    title: "Reducing Carbon Footprint with EVs",
    date: "2 Aug 2024",
    image: "/blog4.avif",
    Link: "/blog8",
  },
];

const INITIAL_COUNT = 4;

export default function BlogNews() {
  const [showAll, setShowAll] = useState(false);

  const visiblePosts = showAll ? posts : posts.slice(0, INITIAL_COUNT);

  return (
    <section className="bg-[#0b0f14] text-white px-6 py-10 sm:px-10 sm:py-14">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold">Blog &amp; News</h2>
        <p className="text-gray-400 mt-2 mb-8">
          Stay updated with the latest in EV world.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {visiblePosts.map((post, i) => (
            <article
              key={i}
              className="relative rounded-2xl overflow-hidden bg-[#12181f] border border-white/5 group cursor-pointer"
            >
              <div className="relative h-56 sm:h-52 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <span className="absolute top-4 left-4 inline-block rounded-md bg-lime-400/15 border border-lime-400/40 px-2.5 py-1 text-xs font-medium text-lime-300">
                  {post.tag}
                </span>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-semibold leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1.5">{post.date}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length > INITIAL_COUNT && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-full border border-lime-400/60 text-lime-300 px-6 py-2.5 text-sm font-medium hover:bg-lime-400/10 transition-colors"
            >
              {showAll ? "Show Less" : "View All Articles"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
