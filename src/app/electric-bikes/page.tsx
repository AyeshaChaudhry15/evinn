"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import bikes from "../../bike-details/bikes.json";

interface Bike {
  id: number;
  name: string;
  brand: string;
  priceText: string;
  price: number;
  rating: number;
  image: string;
  slug: string;
}

const PRICE_MIN = 0;
const PRICE_MAX = 5000000;
const PRICE_STEP = 50000;
const MIN_GAP = 50000;

export default function ElectricBikesPage() {
  const [brand, setBrand] = useState("All Brands");
  const [topSpeed, setTopSpeed] = useState("All");
  const [range, setRange] = useState("All");
  const [sortBy, setSortBy] = useState("Price: Low to High");
  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [visibleProducts, setVisibleProducts] = useState(9);

  const bikeData: Bike[] = bikes.bikes;

  let filteredBikes = bikeData.filter((bike) => {
    const brandMatch = brand === "All Brands" || bike.brand === brand;

    const priceMatch = bike.price >= minPrice && bike.price <= maxPrice;

    return brandMatch && priceMatch;
  });

  if (sortBy === "Price: Low to High") {
    filteredBikes.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "Price: High to Low") {
    filteredBikes.sort((a, b) => b.price - a.price);
  }

  const clearFilters = () => {
    setBrand("All Brands");
    setTopSpeed("All");
    setRange("All");
    setSortBy("Price: Low to High");
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
    setVisibleProducts(9);
  };

  const loadMore = () => {
    setVisibleProducts((previous) => previous + 3);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxPrice - MIN_GAP);
    setMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minPrice + MIN_GAP);
    setMaxPrice(value);
  };

  const displayedBikes = filteredBikes.slice(0, visibleProducts);

  return (
    <main className="min-h-screen bg-[#06111A] px-4 py-8 text-white sm:px-6 lg:px-12 lg:py-14">
      <style jsx global>{`
        .range-thumb {
          pointer-events: none;
        }
        .range-thumb::-webkit-slider-thumb {
          pointer-events: all;
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #8fdf0d;
          box-shadow: 0 0 9px rgba(201, 255, 115, 0.4);
          cursor: pointer;
        }
        .range-thumb::-moz-range-thumb {
          pointer-events: all;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #8fdf0d;
          box-shadow: 0 0 9px rgba(201, 255, 115, 0.4);
          cursor: pointer;
          border: none;
        }
      `}</style>

      <header className="mb-9 flex flex-col justify-between gap-7 lg:flex-row lg:items-start">
        <div>
          <h1 className="text-[32px] font-bold tracking-[-1.5px] sm:text-[38px] lg:text-[42px]">
            Electric Bikes
          </h1>

          <p className="mt-4 text-sm font-medium leading-7 text-[#8B969C] sm:text-[15px]">
            High-performance electric bikes built for speed, style
            <br className="hidden sm:block" />
            and sustainability.
          </p>
        </div>

        <div className="flex items-center gap-4 lg:mt-3">
          <span className="text-sm text-[#AEB7BC]">Sort by</span>

          <div className="relative w-[140px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#273741] bg-[#0A151E] px-4 pr-9 text-sm text-[#DCE1E4] outline-none transition hover:border-[#40515B] focus:border-[#52656F]"
            >
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#89949A]">
              <ChevronDown />
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[245px_minmax(0,1fr)]">
        <aside className="h-fit rounded-[10px] border border-[#263640] bg-[#08131C]/80 p-[14px] sm:p-5 lg:min-h-[700px]">
          <h2 className="mb-7 text-[19px] font-semibold">Filters</h2>

          <div className="mb-7">
            <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
              Brand
            </label>

            <div className="relative">
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-4 pr-10 text-sm text-[#D7DCDF] outline-none transition hover:border-[#3D4E58] focus:border-[#52656F]"
              >
                <option>All Brands</option>

                {[...new Set(bikeData.map((bike) => bike.brand))].map(
                  (bikeBrand) => (
                    <option key={bikeBrand} value={bikeBrand}>
                      {bikeBrand}
                    </option>
                  ),
                )}
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#89949A]">
                <ChevronDown />
              </span>
            </div>
          </div>

          <div className="mb-7">
            <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
              Price Range
            </label>

            <div className="mb-4 flex justify-between text-[10px] text-[#8E999E]">
              <span>PKR {minPrice.toLocaleString()}</span>
              <span>PKR {maxPrice.toLocaleString()}</span>
            </div>

            <div className="relative h-6">
              <div className="absolute left-2 right-2 top-[8px] h-[5px] rounded-full bg-[#1c2830]" />

              <div
                className="absolute top-[8px] h-[5px] rounded-full bg-[#8fdf0d] shadow-[0_0_8px_rgba(145,220,24,0.3)]"
                style={{
                  left: `${(minPrice / PRICE_MAX) * 100}%`,
                  right: `${100 - (maxPrice / PRICE_MAX) * 100}%`,
                }}
              />

              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={minPrice}
                onChange={handleMinChange}
                className="range-thumb absolute left-0 top-0 h-6 w-full cursor-pointer appearance-none bg-transparent"
                style={{ zIndex: minPrice > PRICE_MAX - 500000 ? 5 : 3 }}
              />

              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={maxPrice}
                onChange={handleMaxChange}
                className="range-thumb absolute left-0 top-0 h-6 w-full cursor-pointer appearance-none bg-transparent"
                style={{ zIndex: 4 }}
              />
            </div>
          </div>

          <div className="mb-7">
            <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
              Top Speed
            </label>

            <div className="relative">
              <select
                value={topSpeed}
                onChange={(e) => setTopSpeed(e.target.value)}
                className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-4 pr-10 text-sm text-[#D7DCDF] outline-none transition hover:border-[#3D4E58] focus:border-[#52656F]"
              >
                <option>All</option>
                <option>Under 80 km/h</option>
                <option>80 - 120 km/h</option>
                <option>120+ km/h</option>
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#89949A]">
                <ChevronDown />
              </span>
            </div>
          </div>

          <div className="mb-8">
            <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
              Range
            </label>

            <div className="relative">
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-4 pr-10 text-sm text-[#D7DCDF] outline-none transition hover:border-[#3D4E58] focus:border-[#52656F]"
              >
                <option>All</option>
                <option>Under 100 km</option>
                <option>100 - 200 km</option>
                <option>200+ km</option>
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#89949A]">
                <ChevronDown />
              </span>
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="h-[50px] w-full rounded-lg border border-[#293943] bg-[#0A151E] text-sm font-medium text-[#D3D9DC] transition duration-200 hover:border-[#40515B] hover:bg-[#101E27] active:scale-[0.98]"
          >
            Clear Filters
          </button>
        </aside>

        <section className="w-full">
          {displayedBikes.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {displayedBikes.map((bike) => (
                <Link
                  key={bike.id}
                  href={`/${bike.slug}`}
                  className="group block min-w-0 overflow-hidden rounded-[10px] border border-[#23333D] bg-[#0A151E] transition duration-300 hover:-translate-y-1 hover:border-[#43545E] hover:shadow-[0_14px_35px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex h-[205px] items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(43,58,66,0.30),transparent_67%)] p-3.5">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="block h-full w-full object-contain drop-shadow-[0_13px_9px_rgba(0,0,0,0.55)] transition duration-300 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="px-[17px] pb-[17px] pt-2">
                    <h3 className="mb-2 truncate text-[15px] font-semibold text-[#E7EBED]">
                      {bike.name}
                    </h3>

                    <p className="mb-2 text-sm font-bold tracking-[0.2px] text-[#B9ED42]">
                      {bike.priceText}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-[#6F7B81]">
                      <span className="text-[13px] text-[#B9ED42]">★</span>

                      <span>{bike.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center rounded-[10px] border border-[#23333D] bg-[#0A151E]">
              <div className="text-center">
                <p className="text-lg font-semibold text-[#DCE1E4]">
                  No bikes found
                </p>

                <p className="mt-2 text-sm text-[#78858C]">
                  Try changing your filters.
                </p>
              </div>
            </div>
          )}

          {visibleProducts < filteredBikes.length && (
            <button
              onClick={loadMore}
              className="mx-auto mt-8 block h-[50px] w-[150px] rounded-lg border border-[#293A44] bg-[#0A151E] text-sm font-semibold text-[#DCE1E4] transition duration-200 hover:border-[#42545E] hover:bg-[#111F28] active:scale-[0.98]"
            >
              Load More
            </button>
          )}
        </section>
      </div>
    </main>
  );
}
