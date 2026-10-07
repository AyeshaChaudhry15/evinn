
"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "../../../../components/add-to-cart";
import { api } from "../../../lib/api";

interface Brand {
  _id: string;
  displayName: string;
  logoUrl?: string;
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
  specs?: {
    range: string;
    topSpeed: string;
    battery: string;
    chargingTime: string;
    motorPower: string;
    weight: string;
    warranty: string;
  };
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

export default function CrownCmcPage() {
  const [sortBy, setSortBy] = useState("Price: Low to High");
  const [brandVehicles, setBrandVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const brandName = "Crown CMC";
  const brandSlug = "crown-cmc";

  useEffect(() => {
    const fetchCrownCmcBikes = async () => {
      try {
        setLoading(true);
        setError("");

        const bikesResponse = await api.get<BikesResponse>("/bikes", {
          query: {
            page: 1,
            limit: 100,
          },
        });

        const bikes = bikesResponse?.bikes || [];

        const crownCmcBikes = bikes.filter(
          (bike) =>
            bike.brand?.displayName?.toLowerCase().trim() ===
            brandName.toLowerCase().trim()
        );

        setBrandVehicles(crownCmcBikes);
      } catch (err) {
        console.error("Crown CMC API Error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading bikes."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCrownCmcBikes();
  }, []);

  const sortedVehicles = [...brandVehicles].sort((a, b) => {
    if (sortBy === "Price: Low to High") {
      return a.price - b.price;
    }

    if (sortBy === "Price: High to Low") {
      return b.price - a.price;
    }

    return 0;
  });

  const formatPKR = (price: number) => {
    return `PKR ${price.toLocaleString("en-PK")}`;
  };

  return (
    <main className="min-h-screen bg-[#06111A] px-4 py-8 text-white sm:px-6 lg:px-12 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <header className="mb-9 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white">
              <img
                src="/crown-cmc.png"
                alt="Crown CMC"
                className="h-full w-full object-contain p-1"
              />
            </div>

            <h1 className="text-[28px] font-bold tracking-[-1px] sm:text-[34px] lg:text-[38px]">
              {brandName} Motorcycles
            </h1>

            <Link
              href={`/brand-info/${brandSlug}`}
              className="rounded-full border border-[#2f5c3a] bg-[#0e1f14] px-4 py-1.5 text-sm font-semibold text-[#8FDF0D] transition hover:bg-[#122a19]"
            >
              See Details
            </Link>
          </div>

          <div className="relative shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none rounded-xl border border-white/10 bg-[#0A1822] px-5 py-3 pr-11 text-sm font-medium text-white outline-none transition focus:border-[#8FDF0D]/50 sm:w-auto"
            >
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>

            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </header>

        {loading && (
          <div className="rounded-2xl border border-white/10 py-16 text-center">
            <p className="text-gray-400">
              Loading Crown CMC motorcycles...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 py-16 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && sortedVehicles.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
            <p className="text-gray-500">
              No Crown CMC motorcycles found.
            </p>
          </div>
        )}

        {!loading && !error && sortedVehicles.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedVehicles.map((bike) => (
              <Link
                key={bike._id}
                href={`/${bike.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0A1822] transition duration-300 hover:-translate-y-1 hover:border-[#8FDF0D]/40"
              >
                <div className="flex h-56 items-center justify-center bg-white p-5">
                  <img
                    src={bike.imageUrl}
                    alt={bike.name}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  <p className="mb-1 text-sm text-gray-500">
                    {bike.type}
                  </p>

                  <h2 className="text-xl font-bold transition group-hover:text-[#8FDF0D]">
                    {bike.name}
                  </h2>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="font-semibold text-[#8FDF0D]">
                      {formatPKR(bike.price)}
                    </p>

                    <span className="text-sm text-yellow-400">
                      ★ {bike.rating}
                    </span>
                  </div>

                  <AddToCartButton
                    product={{
                      id: bike._id,
                      name: bike.name,
                      price: bike.price,
                      image: bike.imageUrl,
                    }}
                    className="mt-4 h-[40px] w-full rounded-lg bg-[#8FDF0D] text-sm font-semibold text-[#06111A] transition hover:bg-[#a5ed32] active:scale-[0.98]"
                  >
                    Add to Cart
                  </AddToCartButton>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

