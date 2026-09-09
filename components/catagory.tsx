
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    title: "Electric Bikes",
    description: "High Performance. Zero Emission.",
    cta: "Explore Bikes",
    image: "/hero3.png",
    href: "/electric-bikes",
  },
  {
    title: "Electric Scooters",
    description: "Smart, Stylish, Sustainable.",
    cta: "Explore Scooters",
    image: "/hero2.png",
    href: "/electric-scooters",
  },
];

export default function Category() {
  return (
    <section className="bg-[#06111A] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="pb-4 text-3xl font-bold text-white sm:mb-4 sm:text-4xl lg:text-left lg:text-4xl"
        >
          Shop By Category
        </motion.h2>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
          {CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ y: -5 }}
              className="flex w-full flex-col overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] transition-transform duration-300 hover:bg-white/[0.05] sm:min-h-[420px] md:min-h-[360px] lg:min-h-[340px] lg:flex-row"
            >
              <div className="flex w-full flex-col items-center justify-center px-5 py-7 text-center sm:px-8 sm:py-8 md:px-8 lg:w-[48%] lg:items-start lg:px-7 lg:py-0 lg:text-left xl:px-9">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-2xl xl:text-3xl"
                >
                  {cat.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-2 max-w-[320px] text-sm leading-relaxed text-gray-400 sm:text-base lg:text-sm xl:text-base"
                >
                  {cat.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link
                    href={cat.href}
                    className="mt-5 inline-flex items-center justify-center rounded-md bg-[#8fdf0d] px-5 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-[#a3f722] sm:mt-6 sm:px-6 sm:py-3"
                  >
                    {cat.cta}
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative h-[210px] w-full shrink-0 sm:h-[250px] md:h-[260px] lg:h-full lg:w-[52%] xl:min-h-[340px]"
              >
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-3 sm:p-4 lg:p-2 xl:p-3"
                  priority
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

