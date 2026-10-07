"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import AddToCartButton from "../../../components/add-to-cart";
import { request } from "@/lib/api";

interface Brand {
  _id: string;
  displayName: string;
  logoUrl?: string;
}

interface VehicleSpec {
  range?: string;
  topSpeed?: string;
  battery?: string;
  chargingTime?: string;
  motorPower?: string;
  weight?: string;
  warranty?: string;
}

interface Vehicle {
  _id: string;
  name: string;
  brand: Brand;
  type: string;
  price: number;
  rating: number;
  imageUrl: string;
  slug: string;
  specs?: VehicleSpec;
}

interface BikesResponse {
  bikes?: Vehicle[];
}

interface BrandsResponse {
  brands?: Brand[];
}

const PRICE_MAX = 5000000;
const PRICE_STEP = 50000;
const MIN_GAP = 50000;

export default function ElectricScooters() {
  const [scooters, setScooters] = useState<Vehicle[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedSpeed, setSelectedSpeed] = useState("All");
  const [selectedRange, setSelectedRange] = useState("All");
  const [sortBy, setSortBy] = useState("Price: Low to High");

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadScooters = async () => {
      try {
        const [brandsResponse, scootersResponse] =
          await Promise.all([
            request<BrandsResponse>("/brands"),
            request<BikesResponse>("/bikes", {
              query: {
                page: 1,
                limit: 100,
                type: "scooter",
              },
            }),
          ]);

        setBrands(brandsResponse?.brands ?? []);
        setScooters(scootersResponse?.bikes ?? []);
      } catch (error) {
        console.error(
          "Failed to load electric scooters:",
          error
        );

        setBrands([]);
        setScooters([]);
      } finally {
        setLoading(false);
      }
    };

    loadScooters();
  }, []);

  const filteredScooters = useMemo(() => {
    const result = scooters.filter((scooter) => {
      const brandName =
        typeof scooter.brand === "object"
          ? scooter.brand?.displayName
          : "";

      const price = Number(scooter.price) || 0;

      const speed = parseInt(
        scooter.specs?.topSpeed || "0"
      );

      const range = parseInt(
        scooter.specs?.range || "0"
      );

      const brandMatch =
        selectedBrand === "All Brands" ||
        brandName === selectedBrand;

      const priceMatch =
        price >= minPrice && price <= maxPrice;

      let speedMatch = true;

      if (selectedSpeed === "Under 80 km/h") {
        speedMatch = speed < 80;
      } else if (selectedSpeed === "80 - 120 km/h") {
        speedMatch = speed >= 80 && speed <= 120;
      } else if (selectedSpeed === "120+ km/h") {
        speedMatch = speed > 120;
      }

      let rangeMatch = true;

      if (selectedRange === "Under 100 km") {
        rangeMatch = range < 100;
      } else if (selectedRange === "100 - 200 km") {
        rangeMatch = range >= 100 && range <= 200;
      } else if (selectedRange === "200+ km") {
        rangeMatch = range > 200;
      }

      return (
        brandMatch &&
        priceMatch &&
        speedMatch &&
        rangeMatch
      );
    });

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    }

    if (sortBy === "Price: High to Low") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [
    scooters,
    selectedBrand,
    selectedSpeed,
    selectedRange,
    sortBy,
    minPrice,
    maxPrice,
  ]);

  const clearFilters = () => {
    setSelectedBrand("All Brands");
    setSelectedSpeed("All");
    setSelectedRange("All");
    setSortBy("Price: Low to High");
    setMinPrice(0);
    setMaxPrice(PRICE_MAX);
  };

  return (
    <main className="min-h-screen bg-[#06111A] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Electric Scooters
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#8B969C]">
              Discover efficient electric scooters designed for
              comfortable everyday rides.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#8B969C]">
              Sort by
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-11 w-[180px] appearance-none rounded-lg border border-[#263640] bg-[#0A151E] px-4 pr-10 text-sm text-white outline-none"
              >
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-[240px_1fr]">
          <aside className="h-fit rounded-xl border border-[#263640] bg-[#08131C] p-5">
            <h2 className="mb-6 text-lg font-semibold">
              Filters
            </h2>

            <div className="mb-6">
              <label className="mb-2 block text-sm text-gray-300">
                Brand
              </label>

              <div className="relative">
                <select
                  value={selectedBrand}
                  onChange={(e) =>
                    setSelectedBrand(e.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-3 pr-9 text-sm text-white outline-none"
                >
                  <option>All Brands</option>

                  {brands.map((item) => (
                    <option
                      key={item._id}
                      value={item.displayName}
                    >
                      {item.displayName}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm text-gray-300">
                Price Range
              </label>

              <div className="mb-3 flex justify-between text-xs text-gray-500">
                <span>
                  PKR {minPrice.toLocaleString("en-PK")}
                </span>

                <span>
                  PKR {maxPrice.toLocaleString("en-PK")}
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={minPrice}
                onChange={(e) => {
                  const value = Math.min(
                    Number(e.target.value),
                    maxPrice - MIN_GAP
                  );

                  setMinPrice(value);
                }}
                className="w-full accent-[#8FDF0D]"
              />

              <input
                type="range"
                min={0}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={maxPrice}
                onChange={(e) => {
                  const value = Math.max(
                    Number(e.target.value),
                    minPrice + MIN_GAP
                  );

                  setMaxPrice(value);
                }}
                className="w-full accent-[#8FDF0D]"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm text-gray-300">
                Top Speed
              </label>

              <div className="relative">
                <select
                  value={selectedSpeed}
                  onChange={(e) =>
                    setSelectedSpeed(e.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-3 pr-9 text-sm text-white outline-none"
                >
                  <option>All</option>
                  <option>Under 80 km/h</option>
                  <option>80 - 120 km/h</option>
                  <option>120+ km/h</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="mb-7">
              <label className="mb-2 block text-sm text-gray-300">
                Range
              </label>

              <div className="relative">
                <select
                  value={selectedRange}
                  onChange={(e) =>
                    setSelectedRange(e.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-3 pr-9 text-sm text-white outline-none"
                >
                  <option>All</option>
                  <option>Under 100 km</option>
                  <option>100 - 200 km</option>
                  <option>200+ km</option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="h-11 w-full rounded-lg border border-[#293943] bg-[#0A151E] text-sm text-gray-300 transition hover:bg-[#101E27]"
            >
              Clear Filters
            </button>
          </aside>

          <section>
            {loading ? (
              <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-[#263640] bg-[#0A151E]">
                <p className="text-sm text-gray-400">
                  Loading scooters...
                </p>
              </div>
            ) : filteredScooters.length === 0 ? (
              <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-[#263640] bg-[#0A151E]">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-white">
                    No scooters available
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Products added by the client will appear here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredScooters.map((scooter, index) => (
                  <motion.div
                    key={scooter._id}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                    }}
                    className="overflow-hidden rounded-xl border border-[#263640] bg-[#0A151E]"
                  >
                    <Link href={`/${scooter.slug}`}>
                      <div className="flex h-[220px] items-center justify-center bg-white p-4">
                        <img
                          src={scooter.imageUrl}
                          alt={scooter.name}
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="truncate text-base font-semibold text-white">
                          {scooter.name}
                        </h3>

                        <p className="mt-2 text-sm font-bold text-[#B9ED42]">
                          PKR{" "}
                          {Number(
                            scooter.price
                          ).toLocaleString("en-PK")}
                        </p>

                        <p className="mt-2 text-xs text-gray-500">
                          ★ {scooter.rating || 0}
                        </p>
                      </div>
                    </Link>

                    <div className="px-4 pb-4">
                      <AddToCartButton
                        product={{
                          id: scooter._id,
                          name: scooter.name,
                          price: Number(scooter.price),
                          image: scooter.imageUrl,
                        }}
                        className="h-10 w-full rounded-lg bg-[#B9ED42] text-sm font-semibold text-[#06111A]"
                      >
                        Add to Cart
                      </AddToCartButton>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}