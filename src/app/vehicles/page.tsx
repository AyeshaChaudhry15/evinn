"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import AddToCartButton from "../../../components/add-to-cart";

interface Vehicle {
  _id: string;
  name: string;
  brand: {
    _id: string;
    displayName: string;
    logoUrl?: string;
  };
  type: "bike" | "scooter";
  price: number;
  rating: number;
  imageUrl: string;
  slug: string;
  createdAt?: string;
  specs?: {
    range?: string;
    topSpeed?: string;
    battery?: string;
    chargingTime?: string;
    motorPower?: string;
    weight?: string;
    warranty?: string;
  };
}

const PRICE_MIN = 0;
const PRICE_MAX = 5000000;
const PRICE_STEP = 50000;
const MIN_GAP = 50000;

const API_URL = "https://evinn.evermontech.com/api";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [vehicleType, setVehicleType] = useState("All Types");
  const [brand, setBrand] = useState("All Brands");
  const [topSpeed, setTopSpeed] = useState("All");
  const [range, setRange] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");

  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [visibleProducts, setVisibleProducts] = useState(9);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setApiError("");

        const response = await fetch(
          `${API_URL}/bikes?page=1&limit=100`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data?.message || "Failed to load vehicles."
          );
        }

        setVehicles(Array.isArray(data?.bikes) ? data.bikes : []);
      } catch (error: any) {
        console.error("Vehicles API Error:", error);
        setApiError(
          error?.message || "Something went wrong while loading vehicles."
        );
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const brands = useMemo(() => {
    return [
      ...new Set(
        vehicles
          .map((vehicle) => vehicle.brand?.displayName)
          .filter(Boolean)
      ),
    ];
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    let result = vehicles.filter((vehicle) => {
      const brandMatch =
        brand === "All Brands" ||
        vehicle.brand?.displayName === brand;

      const typeMatch =
        vehicleType === "All Types" ||
        (vehicleType === "Bike" && vehicle.type === "bike") ||
        (vehicleType === "Scooter" && vehicle.type === "scooter");

      const priceMatch =
        vehicle.price >= minPrice &&
        vehicle.price <= maxPrice;

      let speedMatch = true;

      if (topSpeed !== "All" && vehicle.specs?.topSpeed) {
        const speedValue = parseInt(vehicle.specs.topSpeed);

        if (!Number.isNaN(speedValue)) {
          if (topSpeed === "Under 60 km/h") {
            speedMatch = speedValue < 60;
          } else if (topSpeed === "60 - 90 km/h") {
            speedMatch = speedValue >= 60 && speedValue <= 90;
          } else if (topSpeed === "90+ km/h") {
            speedMatch = speedValue > 90;
          }
        }
      }

      let rangeMatch = true;

      if (range !== "All" && vehicle.specs?.range) {
        const rangeValue = parseInt(vehicle.specs.range);

        if (!Number.isNaN(rangeValue)) {
          if (range === "Under 80 km") {
            rangeMatch = rangeValue < 80;
          } else if (range === "80 - 150 km") {
            rangeMatch = rangeValue >= 80 && rangeValue <= 150;
          } else if (range === "150+ km") {
            rangeMatch = rangeValue > 150;
          }
        }
      }

      return (
        brandMatch &&
        typeMatch &&
        priceMatch &&
        speedMatch &&
        rangeMatch
      );
    });

    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "Newest") {
      result.sort((a, b) => {
        const dateA = a.createdAt
          ? new Date(a.createdAt).getTime()
          : 0;

        const dateB = b.createdAt
          ? new Date(b.createdAt).getTime()
          : 0;

        return dateB - dateA;
      });
    }

    return result;
  }, [
    vehicles,
    vehicleType,
    brand,
    topSpeed,
    range,
    sortBy,
    minPrice,
    maxPrice,
  ]);

  const displayedVehicles = filteredVehicles.slice(
    0,
    visibleProducts
  );

  const clearFilters = () => {
    setVehicleType("All Types");
    setBrand("All Brands");
    setTopSpeed("All");
    setRange("All");
    setSortBy("Popular");
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
    setVisibleProducts(9);
  };

  const loadMore = () => {
    setVisibleProducts((previous) => previous + 3);
  };

  const handleMinChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Math.min(
      Number(e.target.value),
      maxPrice - MIN_GAP
    );

    setMinPrice(value);
    setVisibleProducts(9);
  };

  const handleMaxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Math.max(
      Number(e.target.value),
      minPrice + MIN_GAP
    );

    setMaxPrice(value);
    setVisibleProducts(9);
  };

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

      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-9 flex flex-col justify-between gap-7 lg:flex-row lg:items-start"
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[32px] font-bold sm:text-[38px] lg:text-[42px]"
          >
            All Electric Vehicles
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-sm font-medium text-[#8B969C] sm:text-[15px]"
          >
            Explore our wide range of electric bikes and scooters
            <br className="hidden sm:block" />
            from top brands.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-4 lg:mt-3"
        >
          <span className="text-sm text-[#AEB7BC]">
            Sort by
          </span>

          <div className="relative w-[180px]">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setVisibleProducts(9);
              }}
              className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#273741] bg-[#0A151E] px-4 pr-9 text-sm text-[#DCE1E4] outline-none transition hover:border-[#40515B] focus:border-[#52656F]"
            >
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>

            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#89949A]">
              <ChevronDown size={18} />
            </span>
          </div>
        </motion.div>
      </motion.header>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[245px_minmax(0,1fr)]">
        <motion.aside
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="h-fit rounded-[10px] border border-[#263640] bg-[#08131C]/80 p-[14px] sm:p-5 lg:min-h-[700px]"
        >
          <motion.h2
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-7 text-[19px] font-semibold"
          >
            Filters
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="mb-7"
          >
            <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
              Vehicle Type
            </label>

            <div className="relative">
              <select
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value);
                  setVisibleProducts(9);
                }}
                className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-4 pr-10 text-sm text-[#D7DCDF] outline-none transition hover:border-[#3D4E58] focus:border-[#52656F]"
              >
                <option>All Types</option>
                <option>Bike</option>
                <option>Scooter</option>
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#89949A]">
                <ChevronDown size={18} />
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="mb-7"
          >
            <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
              Brand
            </label>

            <div className="relative">
              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setVisibleProducts(9);
                }}
                className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-4 pr-10 text-sm text-[#D7DCDF] outline-none transition hover:border-[#3D4E58] focus:border-[#52656F]"
              >
                <option>All Brands</option>

                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#89949A]">
                <ChevronDown size={18} />
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
            className="mb-7"
          >
            <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
              Price Range
            </label>

            <div className="mb-4 flex justify-between text-[10px] text-[#8E999E]">
              <span>
                PKR {minPrice.toLocaleString("en-US")}
              </span>

              <span>
                PKR {maxPrice.toLocaleString("en-US")}
              </span>
            </div>

            <div className="relative h-6">
              <div className="absolute left-2 right-2 top-[8px] h-[5px] rounded-full bg-[#1c2830]" />

              <div
                className="absolute top-[8px] h-[5px] rounded-full bg-[#8fdf0d]"
                style={{
                  left: `${(minPrice / PRICE_MAX) * 100}%`,
                  right: `${
                    100 - (maxPrice / PRICE_MAX) * 100
                  }%`,
                }}
              />

              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={minPrice}
                onChange={handleMinChange}
                className="range-thumb absolute left-0 top-0 h-6 w-full appearance-none bg-transparent"
              />

              <input
                type="range"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                value={maxPrice}
                onChange={handleMaxChange}
                className="range-thumb absolute left-0 top-0 h-6 w-full appearance-none bg-transparent"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mb-7"
          >
            <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
              Top Speed
            </label>

            <div className="relative">
              <select
                value={topSpeed}
                onChange={(e) => {
                  setTopSpeed(e.target.value);
                  setVisibleProducts(9);
                }}
                className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-4 pr-10 text-sm text-[#D7DCDF] outline-none transition hover:border-[#3D4E58] focus:border-[#52656F]"
              >
                <option>All</option>
                <option>Under 60 km/h</option>
                <option>60 - 90 km/h</option>
                <option>90+ km/h</option>
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#89949A]">
                <ChevronDown size={18} />
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="mb-8"
          >
            <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
              Range
            </label>

            <div className="relative">
              <select
                value={range}
                onChange={(e) => {
                  setRange(e.target.value);
                  setVisibleProducts(9);
                }}
                className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-4 pr-10 text-sm text-[#D7DCDF] outline-none transition hover:border-[#3D4E58] focus:border-[#52656F]"
              >
                <option>All</option>
                <option>Under 80 km</option>
                <option>80 - 150 km</option>
                <option>150+ km</option>
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#89949A]">
                <ChevronDown size={18} />
              </span>
            </div>
          </motion.div>

          <motion.button
            onClick={clearFilters}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-[50px] w-full rounded-lg border border-[#293943] bg-[#0A151E] text-sm font-medium text-[#D3D9DC] transition duration-200 hover:border-[#40515B] hover:bg-[#101E27] active:scale-[0.98]"
          >
            Clear Filters
          </motion.button>
        </motion.aside>

        <section className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-[350px] animate-pulse overflow-hidden rounded-[10px] border border-[#23333D] bg-[#0A151E]"
                >
                  <div className="h-[205px] bg-[#101C25]" />
                  <div className="space-y-3 p-4">
                    <div className="h-4 w-3/4 rounded bg-[#17242D]" />
                    <div className="h-4 w-1/2 rounded bg-[#17242D]" />
                    <div className="h-10 w-full rounded bg-[#17242D]" />
                  </div>
                </div>
              ))}
            </div>
          ) : apiError ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[400px] items-center justify-center rounded-[10px] border border-[#23333D] bg-[#0A151E]"
            >
              <div className="text-center">
                <p className="text-lg font-semibold text-[#DCE1E4]">
                  Unable to load vehicles
                </p>

                <p className="mt-2 text-sm text-[#78858C]">
                  {apiError}
                </p>

                <button
                  onClick={() => window.location.reload()}
                  className="mt-5 rounded-lg bg-[#B9ED42] px-5 py-3 text-sm font-semibold text-[#06111A]"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          ) : displayedVehicles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {displayedVehicles.map((vehicle, index) => (
                  <motion.div
                    key={`${vehicle.type}-${vehicle._id}`}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    whileHover={{ y: -5 }}
                  >
                    <Link
                      href={`/${vehicle.slug || "model-detail"}`}
                      className="group block min-w-0 overflow-hidden rounded-[10px] border border-[#23333D] bg-[#0A151E] transition duration-300 hover:-translate-y-1 hover:border-[#43545E] hover:shadow-[0_14px_35px_rgba(0,0,0,0.3)]"
                    >
                      <div className="flex h-[205px] items-center justify-center bg-white p-3.5">
                        <motion.img
                          src={vehicle.imageUrl}
                          alt={vehicle.name}
                          whileHover={{ scale: 1.04 }}
                          transition={{ duration: 0.3 }}
                          className="block h-full w-full object-contain transition duration-300 group-hover:scale-[1.04]"
                        />
                      </div>

                      <div className="px-[17px] pb-[17px] pt-2">
                        <h3 className="mb-1 text-[15px] font-semibold text-[#E7EBED]">
                          {vehicle.name}
                        </h3>

                        <p className="mb-2 text-xs text-[#78858C]">
                          {vehicle.brand?.displayName}
                        </p>

                        <p className="mb-2 text-sm font-bold tracking-[0.2px] text-[#B9ED42]">
                          PKR {vehicle.price.toLocaleString("en-US")}
                        </p>

                        <div className="mb-3 flex items-center justify-between text-xs text-[#6F7B81]">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[13px] text-[#B9ED42]">
                              ★
                            </span>

                            <span>{vehicle.rating}</span>
                          </div>

                          <span className="capitalize">
                            {vehicle.type}
                          </span>
                        </div>

                        <AddToCartButton
                          product={{
                            id: vehicle._id,
                            name: vehicle.name,
                            price: vehicle.price,
                            image: vehicle.imageUrl,
                          }}
                          className="h-[40px] w-full rounded-lg bg-[#B9ED42] text-sm font-semibold text-[#06111A] transition hover:bg-[#a6d835] active:scale-[0.98]"
                        >
                          Add to Cart
                        </AddToCartButton>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {visibleProducts < filteredVehicles.length && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={loadMore}
                  className="mx-auto mt-8 block h-[50px] w-[150px] rounded-lg border border-[#293A44] bg-[#0A151E] text-sm font-semibold text-[#DCE1E4] transition duration-200 hover:border-[#42545E] hover:bg-[#111F28] active:scale-[0.98]"
                >
                  Load More
                </motion.button>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex min-h-[400px] items-center justify-center rounded-[10px] border border-[#23333D] bg-[#0A151E]"
            >
              <div className="text-center">
                <p className="text-lg font-semibold text-[#DCE1E4]">
                  No vehicles found
                </p>

                <p className="mt-2 text-sm text-[#78858C]">
                  Try changing your filters.
                </p>
              </div>
            </motion.div>
          )}
        </section>
      </div>
    </main>
  );
}