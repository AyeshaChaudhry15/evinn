"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Info, ClipboardList, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import vehiclesData from "../../../bike-details/bikes-scooter.json";
import brandInfo from "../brand-info.json";
import AddToCartButton from "../../../../components/add-to-cart";

interface Vehicle {
  id: string | number;
  name: string;
  brand: string;
  type: string;
  priceText: string;
  price: number;
  rating: number;
  image: string;
  slug: string;
}

interface BrandInfo {
  displayName: string;
  logo: string;
  origin: string;
  established: string;
  headquarters: string;
  about: string;
  website: string;
  instagram: string;
  twitter: string;
  facebook: string;
}

export default function BrandDetailPage() {
  const params = useParams();

  const brandSlug = typeof params.brand === "string" ? params.brand : "";

  const info = (brandInfo as Record<string, BrandInfo>)[brandSlug];

  const bikeData: Vehicle[] = Array.isArray(vehiclesData)
    ? vehiclesData
    : [
        ...((vehiclesData as { bikes?: Vehicle[] })?.bikes || []),
        ...((vehiclesData as { scooters?: Vehicle[] })?.scooters || []),
      ];

  if (!info) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06111A] px-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="mb-3 text-3xl font-bold">Brand Not Found</h1>

          <p className="mb-6 text-gray-400">
            The requested brand information could not be found.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/brands"
              className="inline-flex items-center gap-2 rounded-lg bg-[#8FDF0D] px-5 py-3 font-semibold text-black transition hover:bg-[#a5ed32]"
            >
              <ArrowLeft size={18} />
              Back to Brands
            </Link>
          </motion.div>
        </motion.div>
      </main>
    );
  }

  const models = bikeData.filter(
    (vehicle) =>
      vehicle.brand?.toLowerCase().trim() ===
      info.displayName?.toLowerCase().trim(),
  );

  return (
    <main className="min-h-screen bg-[#06111A] px-4 py-8 text-white sm:px-6 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={`/brands/${brandSlug}`}
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-[#8FDF0D]"
          >
            <ArrowLeft size={17} />
            Back to {info.displayName}
          </Link>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 rounded-3xl border border-white/10 bg-[#0A1822] p-6 sm:p-8 lg:p-10"
        >
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl p-3"
            >
              <img
                src={info.logo}
                alt={`${info.displayName} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-[#8FDF0D]">
                Brand Information
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {info.displayName}
              </h1>

              <p className="mt-2 text-gray-400">
                Discover {info.displayName} motorcycles and electric vehicles.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <section className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-[#0A1822] p-6 sm:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8FDF0D]/10 text-[#8FDF0D]"
              >
                <Info size={21} />
              </motion.div>

              <h2 className="text-2xl font-bold">
                About {info.displayName}
              </h2>
            </div>

            <p className="leading-8 text-gray-400">{info.about}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-[#0A1822] p-6 sm:p-8"
          >
            <h2 className="mb-6 text-2xl font-bold">Quick Facts</h2>

            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <p className="text-sm text-gray-500">Origin</p>

                <p className="mt-1 font-semibold">
                  {info.origin || "—"}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
              >
                <p className="text-sm text-gray-500">Established</p>

                <p className="mt-1 font-semibold">
                  {info.established || "—"}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <p className="text-sm text-gray-500">Headquarters</p>

                <p className="mt-1 font-semibold">
                  {info.headquarters || "—"}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <p className="text-sm text-gray-500">Models Listed</p>

                <p className="mt-1 font-semibold text-[#8FDF0D]">
                  {models.length}
                </p>
              </motion.div>
            </div>
          </motion.div>

        </section>

        <motion.section
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-6 rounded-3xl border border-white/10 bg-[#0A1822] p-6 sm:p-8"
        >
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8FDF0D]/10 text-[#8FDF0D]">
                  <ClipboardList size={21} />
                </div>

                <h2 className="text-2xl font-bold">
                  {info.displayName} Models
                </h2>
              </div>

              <p className="mt-2 text-gray-500">
                {models.length} model{models.length !== 1 ? "s" : ""} available
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={`/brands/${brandSlug}`}
                className="inline-flex items-center justify-center rounded-lg bg-[#8FDF0D] px-5 py-3 font-semibold text-black transition hover:bg-[#a5ed32]"
              >
                Browse Models
              </Link>
            </motion.div>
          </div>

          {models.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-dashed border-white/10 py-12 text-center"
            >
              <p className="text-gray-500">
                No models available for this brand yet.
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {models.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={`/${vehicle.slug}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-[#06111A] transition hover:-translate-y-1 hover:border-[#8FDF0D]/40"
                  >
                    <div className="flex h-48 items-center justify-center bg-white p-5">
                      <motion.img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                        whileHover={{ scale: 1.08 }}
                      />
                    </div>

                    <div className="p-5">
                      <p className="mb-1 text-sm text-gray-500">
                        {vehicle.type}
                      </p>

                      <h3 className="text-lg font-bold transition group-hover:text-[#8FDF0D]">
                        {vehicle.name}
                      </h3>

                      <p className="mt-3 font-semibold text-[#8FDF0D]">
                        {vehicle.priceText}
                      </p>

                      <AddToCartButton
                        product={{
                          id: vehicle.id,
                          name: vehicle.name,
                          price: vehicle.price,
                          image: vehicle.image,
                        }}
                        className="mt-4 h-[40px] w-full rounded-lg bg-[#8FDF0D] text-sm font-semibold text-[#06111A] transition hover:bg-[#a5ed32] active:scale-[0.98]"
                      >
                        Add to Cart
                      </AddToCartButton>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </main>
  );
}