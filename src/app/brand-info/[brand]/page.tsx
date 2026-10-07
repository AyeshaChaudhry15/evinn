
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Info, ClipboardList, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import AddToCartButton from "../../../../components/add-to-cart";

const API_URL = "http://localhost:5000/api";

interface Brand {
  _id: string;
  displayName: string;
  logoUrl?: string;
  origin?: string;
  established?: string;
  headquarters?: string;
  about?: string;
  websiteUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  facebookUrl?: string;
}

interface Vehicle {
  _id: string;
  name: string;
  brand: {
    _id: string;
    displayName: string;
    logoUrl?: string;
  };
  type: string;
  price: number;
  rating: number;
  imageUrl: string;
  slug: string;
}

interface BrandsResponse {
  brands: Brand[];
}

interface BikesResponse {
  bikes: Vehicle[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export default function BrandDetailPage() {
  const params = useParams();

  const brandSlug =
    typeof params.brand === "string" ? params.brand : "";

  const [brand, setBrand] = useState<Brand | null>(null);
  const [models, setModels] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBrandData = async () => {
      if (!brandSlug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const brandsResponse = await fetch(`${API_URL}/brands`, {
          credentials: "include",
        });

        if (!brandsResponse.ok) {
          throw new Error("Failed to load brands.");
        }

        const brandsData: BrandsResponse =
          await brandsResponse.json();

        const foundBrand = brandsData.brands.find((item) => {
          const slug = item.displayName
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");

          return slug === brandSlug.toLowerCase();
        });

        if (!foundBrand) {
          setBrand(null);
          setModels([]);
          setError("Brand not found.");
          return;
        }

        setBrand(foundBrand);

        const bikesResponse = await fetch(
          `${API_URL}/bikes?brand=${foundBrand._id}&page=1&limit=100`,
          {
            credentials: "include",
          }
        );

        if (!bikesResponse.ok) {
          throw new Error("Failed to load brand models.");
        }

        const bikesData: BikesResponse =
          await bikesResponse.json();

        setModels(bikesData.bikes || []);
      } catch (err) {
        console.error("Brand API Error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading brand information."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBrandData();
  }, [brandSlug]);

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString("en-US")}`;
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06111A] text-white">
        <p className="text-lg">Loading brand...</p>
      </main>
    );
  }

  if (error || !brand) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#06111A] px-6 text-white">
        <p className="mb-6 text-lg text-red-400">
          {error || "Brand not found."}
        </p>

        <Link
          href="/brands"
          className="flex items-center gap-2 rounded-lg bg-[#8FDF0D] px-5 py-3 font-semibold text-black"
        >
          <ArrowLeft size={18} />
          Back to Brands
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#06111A] text-white">
      <section className="px-6 py-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/brands"
            className="mb-10 inline-flex items-center gap-2 text-gray-400 transition hover:text-[#8FDF0D]"
          >
            <ArrowLeft size={18} />
            Back to Brands
          </Link>

          <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8"
            >
              <div className="flex justify-center">
                {brand.logoUrl ? (
                  <img
                    src={brand.logoUrl}
                    alt={brand.displayName}
                    className="h-40 w-40 rounded-xl object-contain"
                  />
                ) : (
                  <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-white/10 text-gray-400">
                    No Logo
                  </div>
                )}
              </div>

              <h1 className="mt-6 text-center text-3xl font-bold">
                {brand.displayName}
              </h1>

              <div className="mt-8 space-y-4 text-sm">
                {brand.origin && (
                  <div>
                    <p className="text-gray-500">Origin</p>
                    <p className="mt-1 text-gray-200">
                      {brand.origin}
                    </p>
                  </div>
                )}

                {brand.established && (
                  <div>
                    <p className="text-gray-500">Established</p>
                    <p className="mt-1 text-gray-200">
                      {brand.established}
                    </p>
                  </div>
                )}

                {brand.headquarters && (
                  <div>
                    <p className="text-gray-500">Headquarters</p>
                    <p className="mt-1 text-gray-200">
                      {brand.headquarters}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {brand.websiteUrl && (
                  <a
                    href={brand.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-[#8FDF0D] px-4 py-2 text-sm font-semibold text-black"
                  >
                    Website
                  </a>
                )}

                {brand.instagramUrl && (
                  <a
                    href={brand.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-[#8FDF0D] hover:text-[#8FDF0D]"
                  >
                    Instagram
                  </a>
                )}

                {brand.facebookUrl && (
                  <a
                    href={brand.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-[#8FDF0D] hover:text-[#8FDF0D]"
                  >
                    Facebook
                  </a>
                )}

                {brand.twitterUrl && (
                  <a
                    href={brand.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-[#8FDF0D] hover:text-[#8FDF0D]"
                  >
                    Twitter
                  </a>
                )}
              </div>
            </motion.div>

            <div>
              {brand.about && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-10 rounded-2xl border border-white/10 bg-white/5 p-8"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <Info
                      className="text-[#8FDF0D]"
                      size={24}
                    />

                    <h2 className="text-2xl font-bold">
                      About {brand.displayName}
                    </h2>
                  </div>

                  <p className="leading-8 text-gray-400">
                    {brand.about}
                  </p>
                </motion.div>
              )}

              <div className="mb-6 flex items-center gap-3">
                <ClipboardList
                  className="text-[#8FDF0D]"
                  size={25}
                />

                <h2 className="text-2xl font-bold">
                  {brand.displayName} Models
                </h2>
              </div>

              {models.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center text-gray-400">
                  No models available for this brand.
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {models.map((vehicle) => (
                    <motion.div
                      key={vehicle._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                    >
                      <Link href={`/bikes/${vehicle.slug}`}>
                        <div className="h-56 overflow-hidden bg-white">
                          <img
                            src={vehicle.imageUrl}
                            alt={vehicle.name}
                            className="h-full w-full object-contain transition duration-300 hover:scale-105"
                          />
                        </div>

                        <div className="p-5">
                          <p className="mb-2 text-sm capitalize text-[#8FDF0D]">
                            {vehicle.type}
                          </p>

                          <h3 className="text-lg font-semibold">
                            {vehicle.name}
                          </h3>

                          <div className="mt-3 flex items-center justify-between">
                            <p className="font-semibold text-[#8FDF0D]">
                              {formatPrice(vehicle.price)}
                            </p>

                            <p className="text-sm text-yellow-400">
                              ★ {vehicle.rating}
                            </p>
                          </div>
                        </div>
                      </Link>

                      <div className="px-5 pb-5">
                        <AddToCartButton
                          product={{
                            id: vehicle._id,
                            name: vehicle.name,
                            price: vehicle.price,
                            image: vehicle.imageUrl,
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

