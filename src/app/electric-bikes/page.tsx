
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import AddToCartButton from "../../../components/add-to-cart";

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

const PRICE_MIN = 0;
const PRICE_MAX = 5000000;
const PRICE_STEP = 50000;
const MIN_GAP = 50000;
const INITIAL_VISIBLE_PRODUCTS = 9;

export default function ElectricBikes() {
  const [bikes, setBikes] = useState<Vehicle[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [selectedBrand, setSelectedBrand] =
    useState("All Brands");
  const [selectedSpeed, setSelectedSpeed] =
    useState("All");
  const [selectedRange, setSelectedRange] =
    useState("All");
  const [sortBy, setSortBy] =
    useState("Price: Low to High");

  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);

  const [visibleProducts, setVisibleProducts] =
    useState(INITIAL_VISIBLE_PRODUCTS);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadBikes = async () => {
      try {
        setLoading(true);
        setError("");

        const [brandsResponse, bikesResponse] =
          await Promise.all([
            fetch(
              "https://evinn.evermontech.com/api/brands",
              {
                method: "GET",
              }
            ),
            fetch(
              "https://evinn.evermontech.com/api/bikes?page=1&limit=100&type=bike",
              {
                method: "GET",
              }
            ),
          ]);

        const brandsData: BrandsResponse =
          await brandsResponse.json().catch(() => ({}));

        const bikesData: BikesResponse =
          await bikesResponse.json().catch(() => ({}));

        if (!brandsResponse.ok) {
          throw new Error(
            "Failed to load brands."
          );
        }

        if (!bikesResponse.ok) {
          throw new Error(
            "Failed to load bikes."
          );
        }

        setBrands(brandsData.brands || []);
        setBikes(bikesData.bikes || []);
      } catch (err: unknown) {
        console.error(
          "Electric Bikes API Error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading bikes."
        );
      } finally {
        setLoading(false);
      }
    };

    loadBikes();
  }, []);

  const filteredBikes = useMemo(() => {
    const result = bikes.filter((bike) => {
      const bikeBrandName =
        typeof bike.brand === "object"
          ? bike.brand?.displayName
          : "";

      const price = Number(bike.price) || 0;

      const speedValue = parseInt(
        bike.specs?.topSpeed || "0",
        10
      );

      const rangeValue = parseInt(
        bike.specs?.range || "0",
        10
      );

      const brandMatch =
        selectedBrand === "All Brands" ||
        bikeBrandName === selectedBrand;

      const priceMatch =
        price >= minPrice &&
        price <= maxPrice;

      let speedMatch = true;

      if (
        selectedSpeed !== "All" &&
        !Number.isNaN(speedValue)
      ) {
        if (selectedSpeed === "Under 80 km/h") {
          speedMatch = speedValue < 80;
        } else if (
          selectedSpeed === "80 - 120 km/h"
        ) {
          speedMatch =
            speedValue >= 80 &&
            speedValue <= 120;
        } else if (
          selectedSpeed === "120+ km/h"
        ) {
          speedMatch = speedValue > 120;
        }
      }

      let rangeMatch = true;

      if (
        selectedRange !== "All" &&
        !Number.isNaN(rangeValue)
      ) {
        if (selectedRange === "Under 100 km") {
          rangeMatch = rangeValue < 100;
        } else if (
          selectedRange === "100 - 200 km"
        ) {
          rangeMatch =
            rangeValue >= 100 &&
            rangeValue <= 200;
        } else if (
          selectedRange === "200+ km"
        ) {
          rangeMatch = rangeValue > 200;
        }
      }

      return (
        brandMatch &&
        priceMatch &&
        speedMatch &&
        rangeMatch
      );
    });

    if (sortBy === "Price: Low to High") {
      result.sort(
        (a, b) =>
          Number(a.price) - Number(b.price)
      );
    }

    if (sortBy === "Price: High to Low") {
      result.sort(
        (a, b) =>
          Number(b.price) - Number(a.price)
      );
    }

    return result;
  }, [
    bikes,
    selectedBrand,
    selectedSpeed,
    selectedRange,
    sortBy,
    minPrice,
    maxPrice,
  ]);

  useEffect(() => {
    setVisibleProducts(INITIAL_VISIBLE_PRODUCTS);
  }, [
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
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
    setVisibleProducts(INITIAL_VISIBLE_PRODUCTS);
  };

  const loadMore = () => {
    setVisibleProducts(
      (previous) => previous + 3
    );
  };

  const handleMinChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Math.min(
      Number(e.target.value),
      maxPrice - MIN_GAP
    );

    setMinPrice(value);
  };

  const handleMaxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Math.max(
      Number(e.target.value),
      minPrice + MIN_GAP
    );

    setMaxPrice(value);
  };

  const displayedBikes = filteredBikes.slice(
    0,
    visibleProducts
  );

  return (
    <main className="min-h-screen bg-[#06111A] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Electric Bikes
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#8B969C]">
              Explore our collection of high-performance
              electric bikes built for modern and
              sustainable transportation.
            </p>
          </div>

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="flex items-center gap-4 lg:mt-3"
          >
            <span className="text-sm text-[#AEB7BC]">
              Sort by
            </span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#273741] bg-[#0A151E] px-4 pr-9 text-sm text-[#DCE1E4] outline-none transition hover:border-[#40515B] focus:border-[#52656F]"
              >
                <option>
                  Price: Low to High
                </option>
                <option>
                  Price: High to Low
                </option>
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#89949A]">
                <ChevronDown className="h-4 w-4" />
              </span>
            </div>
          </motion.div>
        </div>

        {loading && (
          <div className="flex min-h-[400px] items-center justify-center rounded-[10px] border border-[#23333D] bg-[#0A151E]">
            <p className="text-[#78858C]">
              Loading electric bikes...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="flex min-h-[400px] items-center justify-center rounded-[10px] border border-red-500/20 bg-[#0A151E]">
            <div className="text-center">
              <p className="text-lg font-semibold text-red-400">
                {error}
              </p>

              <p className="mt-2 text-sm text-[#78858C]">
                Please try again later.
              </p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[245px_minmax(0,1fr)]">
            <motion.aside
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="h-fit rounded-[10px] border border-[#263640] bg-[#08131C]/80 p-[14px] sm:p-5 lg:min-h-[700px]"
            >
              <h2 className="mb-7 text-[19px] font-semibold">
                Filters
              </h2>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.25,
                }}
                className="mb-7"
              >
                <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
                  Brand
                </label>

                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) =>
                      setSelectedBrand(
                        e.target.value
                      )
                    }
                    className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-4 pr-10 text-sm text-[#D7DCDF] outline-none transition hover:border-[#3D4E58] focus:border-[#52656F]"
                  >
                    <option>
                      All Brands
                    </option>

                    {brands.map((bikeBrand) => (
                      <option
                        key={bikeBrand._id}
                        value={
                          bikeBrand.displayName
                        }
                      >
                        {bikeBrand.displayName}
                      </option>
                    ))}
                  </select>

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#89949A]">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.35,
                }}
                className="mb-7"
              >
                <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
                  Price Range
                </label>

                <div className="mb-4 flex justify-between text-[10px] text-[#8E999E]">
                  <span>
                    PKR{" "}
                    {minPrice.toLocaleString(
                      "en-PK"
                    )}
                  </span>

                  <span>
                    PKR{" "}
                    {maxPrice.toLocaleString(
                      "en-PK"
                    )}
                  </span>
                </div>

                <div className="relative h-6">
                  <div className="absolute left-2 right-2 top-[8px] h-[5px] rounded-full bg-[#1c2830]" />

                  <div
                    className="absolute top-[8px] h-[5px] rounded-full bg-[#8fdf0d] shadow-[0_0_8px_rgba(145,220,24,0.3)]"
                    style={{
                      left: `${
                        (minPrice / PRICE_MAX) *
                        100
                      }%`,
                      right: `${
                        100 -
                        (maxPrice / PRICE_MAX) *
                          100
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
                    className="range-thumb absolute left-0 top-0 h-6 w-full cursor-pointer appearance-none bg-transparent"
                    style={{
                      zIndex:
                        minPrice >
                        PRICE_MAX - 500000
                          ? 5
                          : 3,
                    }}
                  />

                  <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={PRICE_STEP}
                    value={maxPrice}
                    onChange={handleMaxChange}
                    className="range-thumb absolute left-0 top-0 h-6 w-full cursor-pointer appearance-none bg-transparent"
                    style={{
                      zIndex: 4,
                    }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.45,
                }}
                className="mb-7"
              >
                <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
                  Top Speed
                </label>

                <div className="relative">
                  <select
                    value={selectedSpeed}
                    onChange={(e) =>
                      setSelectedSpeed(
                        e.target.value
                      )
                    }
                    className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-4 pr-10 text-sm text-[#D7DCDF] outline-none transition hover:border-[#3D4E58] focus:border-[#52656F]"
                  >
                    <option>All</option>
                    <option>
                      Under 80 km/h
                    </option>
                    <option>
                      80 - 120 km/h
                    </option>
                    <option>
                      120+ km/h
                    </option>
                  </select>

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#89949A]">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.55,
                }}
                className="mb-8"
              >
                <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
                  Range
                </label>

                <div className="relative">
                  <select
                    value={selectedRange}
                    onChange={(e) =>
                      setSelectedRange(
                        e.target.value
                      )
                    }
                    className="h-12 w-full cursor-pointer appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-4 pr-10 text-sm text-[#D7DCDF] outline-none transition hover:border-[#3D4E58] focus:border-[#52656F]"
                  >
                    <option>All</option>
                    <option>
                      Under 100 km
                    </option>
                    <option>
                      100 - 200 km
                    </option>
                    <option>
                      200+ km
                    </option>
                  </select>

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#89949A]">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>

              <motion.button
                onClick={clearFilters}
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.65,
                }}
                className="h-[50px] w-full rounded-lg border border-[#293943] bg-[#0A151E] text-sm font-medium text-[#D3D9DC] transition duration-200 hover:border-[#40515B] hover:bg-[#101E27] active:scale-[0.98]"
              >
                Clear Filters
              </motion.button>
            </motion.aside>

            <section className="w-full">
              {displayedBikes.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {displayedBikes.map(
                      (bike, index) => (
                        <motion.div
                          key={bike._id}
                          initial={{
                            opacity: 0,
                            y: 35,
                          }}
                          whileInView={{
                            opacity: 1,
                            y: 0,
                          }}
                          viewport={{
                            once: true,
                          }}
                          transition={{
                            duration: 0.5,
                            delay:
                              index * 0.08,
                          }}
                          whileHover={{
                            y: -6,
                          }}
                        >
                          <Link
                            href={`/${bike.slug}`}
                            className="group block min-w-0 overflow-hidden rounded-[10px] border border-[#23333D] bg-[#0A151E] transition duration-300 hover:-translate-y-1 hover:border-[#43545E] hover:shadow-[0_14px_35px_rgba(0,0,0,0.3)]"
                          >
                            <div className="flex h-[205px] items-center justify-center bg-white p-3.5">
                              <motion.img
                                src={
                                  bike.imageUrl
                                }
                                alt={
                                  bike.name
                                }
                                className="block h-full w-full object-contain transition duration-300 group-hover:scale-[1.04]"
                                whileHover={{
                                  scale: 1.07,
                                }}
                              />
                            </div>

                            <div className="px-[17px] pb-[17px] pt-3">
                              <h3 className="mb-2 truncate text-[15px] font-semibold text-[#E7EBED]">
                                {
                                  bike.name
                                }
                              </h3>

                              <p className="mb-2 text-sm font-bold tracking-[0.2px] text-[#B9ED42]">
                                PKR{" "}
                                {Number(
                                  bike.price
                                ).toLocaleString(
                                  "en-PK"
                                )}
                              </p>

                              <div className="mb-3 flex items-center gap-1.5 text-xs text-[#6F7B81]">
                                <span className="text-[13px] text-[#B9ED42]">
                                  ★
                                </span>

                                <span>
                                  {
                                    bike.rating
                                  }
                                </span>
                              </div>

                              <AddToCartButton
                                product={{
                                  id: bike._id,
                                  name: bike.name,
                                  price: Number(
                                    bike.price
                                  ),
                                  image:
                                    bike.imageUrl,
                                }}
                                className="h-[40px] w-full rounded-lg bg-[#B9ED42] text-sm font-semibold text-[#06111A] transition hover:bg-[#a6d835] active:scale-[0.98]"
                              >
                                Add to Cart
                              </AddToCartButton>
                            </div>
                          </Link>
                        </motion.div>
                      )
                    )}
                  </div>

                  {visibleProducts <
                    filteredBikes.length && (
                    <motion.button
                      onClick={loadMore}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      whileHover={{
                        scale: 1.04,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="mx-auto mt-8 block h-[50px] w-[150px] rounded-lg border border-[#293A44] bg-[#0A151E] text-sm font-semibold text-[#DCE1E4] transition duration-200 hover:border-[#42545E] hover:bg-[#111F28] active:scale-[0.98]"
                    >
                      Load More
                    </motion.button>
                  )}
                </>
              ) : (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="flex min-h-[400px] items-center justify-center rounded-[10px] border border-[#23333D] bg-[#0A151E]"
                >
                  <div className="text-center">
                    <p className="text-lg font-semibold text-[#DCE1E4]">
                      No bikes found
                    </p>

                    <p className="mt-2 text-sm text-[#78858C]">
                      Try adjusting your filters.
                    </p>
                  </div>
                </motion.div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
