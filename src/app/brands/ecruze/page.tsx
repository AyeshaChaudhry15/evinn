"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import vehiclesData from "../../../bike-details/bikes-scooter.json"; // apni folder depth k hisaab se path adjust karo

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

export default function ecruze() {
  const [sortBy, setSortBy] = useState("Price: Low to High");

  const bikeData: Vehicle[] = Array.isArray(vehiclesData)
    ? vehiclesData
    : (vehiclesData as { bikes?: Vehicle[] })?.bikes || [];

  const brandName = "Okla";
  let oklaBikes = bikeData.filter((bike) => bike.brand === brandName);

  if (sortBy === "Price: Low to High") {
    oklaBikes = [...oklaBikes].sort((a, b) => a.price - b.price);
  } else if (sortBy === "Price: High to Low") {
    oklaBikes = [...oklaBikes].sort((a, b) => b.price - a.price);
  }

  const allBrands = [...new Set(bikeData.map((bike) => bike.brand))];

  const firstBikeSlug = oklaBikes[0]?.slug;

  return (
    <main className="min-h-screen bg-[#06111A] px-4 py-8 text-white sm:px-6 lg:px-12 lg:py-14">
      <header className="mb-9 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 ">
            <span>
              <img src="/okla.png" alt="" className="h-14 w-14 bg-white rounded-2xl" />
            </span>
          </div>

          <h1 className="text-[28px] font-bold tracking-[-1px] sm:text-[34px] lg:text-[38px]">
            {brandName} Motorcycles
          </h1>

          {firstBikeSlug && (
            <Link
              href={`/${firstBikeSlug}`}
              className="ml-2 rounded-full border border-[#2f5c3a] bg-[#0e1f14] px-4 py-1.5 text-sm font-semibold text-[#8FDF0D] transition hover:bg-[#122a19]"
            >
              See Details
            </Link>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#AEB7BC]">Sort By</span>

            <div className="relative w-[190px]">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#273741] bg-[#0A151E] px-4 pr-9 text-sm text-[#DCE1E4] outline-none transition hover:border-[#40515B] focus:border-[#52656F]"
              >
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#89949A]">
                <ChevronDown className="h-4 w-4" />
              </span>
            </div>
          </div>

          <div className="relative w-[160px]">
            <select
              value={brandName}
              onChange={(e) => {
                const slug = e.target.value.toLowerCase().replace(/\s+/g, "-");
                window.location.href = `/electric-bikes/${slug}`; // apna route pattern adjust karo
              }}
              className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#273741] bg-[#0A151E] px-4 pr-9 text-sm text-[#DCE1E4] outline-none transition hover:border-[#40515B] focus:border-[#52656F]"
            >
              {allBrands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#89949A]">
              <ChevronDown className="h-4 w-4" />
            </span>
          </div>
        </div>
      </header>

      <section className="w-full">
        {oklaBikes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {oklaBikes.map((bike) => (
              <Link
                key={bike.id}
                href={`/${bike.slug}`}
                className="group block min-w-0 overflow-hidden rounded-[10px] border border-[#23333D] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#43545E] hover:shadow-[0_14px_35px_rgba(0,0,0,0.35)]"
              >
                <div className="relative flex h-[240px] items-center justify-center bg-white p-4">
                  <button
                    type="button"
                    onClick={(e) => e.preventDefault()}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/10 text-black/70 transition hover:bg-black/20"
                    aria-label="Add to favorites"
                  >
                    ♡
                  </button>

                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="block h-full w-full object-contain transition duration-300 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex items-center justify-between border-t border-[#1a1a1a] bg-[#0A0A0A] px-4 py-4">
                  <div className="flex items-center gap-2.5">

                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-[8px] font-bold text-black">
                      {brandName.slice(0, 2).toUpperCase()}
                    </div>
                    <h3 className="truncate text-[15px] font-semibold text-white">
                      {bike.name}
                    </h3>
                  </div>

                  <p className="whitespace-nowrap text-sm font-bold tracking-[0.2px] text-[#8FDF0D]">
                    {bike.priceText}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center rounded-[10px] border border-[#23333D] bg-[#0A151E]">
            <div className="text-center">
              <p className="text-lg font-semibold text-[#DCE1E4]">
                No {brandName} bikes found
              </p>
              <p className="mt-2 text-sm text-[#78858C]">
                Please check back later.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
