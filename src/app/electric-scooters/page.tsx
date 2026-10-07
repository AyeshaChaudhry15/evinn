
"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
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

interface Scooter {
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

interface ScootersResponse {
  bikes?: Scooter[];
}

interface BrandsResponse {
  brands?: Brand[];
}

const PRICE_MIN = 0;
const PRICE_MAX = 5000000;
const PRICE_STEP = 50000;
const MIN_GAP = 50000;
const INITIAL_VISIBLE_PRODUCTS = 9;

const API_URL =
  "https://evinn.evermontech.com/api";

export default function ElectricScootersPage() {
  const [scooters, setScooters] = useState<
    Scooter[]
  >([]);

  const [brands, setBrands] = useState<Brand[]>(
    []
  );

  const [selectedBrand, setSelectedBrand] =
    useState("All Brands");

  const [selectedSpeed, setSelectedSpeed] =
    useState("All");

  const [selectedRange, setSelectedRange] =
    useState("All");

  const [sortBy, setSortBy] = useState(
    "Price: Low to High"
  );

  const [minPrice, setMinPrice] =
    useState(PRICE_MIN);

  const [maxPrice, setMaxPrice] =
    useState(PRICE_MAX);

  const [visibleProducts, setVisibleProducts] =
    useState(INITIAL_VISIBLE_PRODUCTS);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadScooters = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          brandsResponse,
          scootersResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/brands`, {
            method: "GET",
            credentials: "include",
          }),

          fetch(
            `${API_URL}/bikes?page=1&limit=100&type=scooter`,
            {
              method: "GET",
              credentials: "include",
            }
          ),
        ]);

        const brandsData: BrandsResponse =
          await brandsResponse
            .json()
            .catch(() => ({}));

        const scootersData: ScootersResponse =
          await scootersResponse
            .json()
            .catch(() => ({}));
if (!brandsResponse.ok) {
  const message =
    brandsData &&
    typeof brandsData === "object" &&
    "message" in brandsData &&
    typeof brandsData.message === "string"
      ? brandsData.message
      : "Failed to load brands.";

  throw new Error(message);
}
        if (!scootersResponse.ok) {
          throw new Error(
            "Failed to load scooters."
          );
        }

        setBrands(
          brandsData?.brands || []
        );

        setScooters(
          scootersData?.bikes || []
        );
      } catch (err: unknown) {
        console.error(
          "Electric Scooters API Error:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading scooters."
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
    const result = scooters.filter(
      (scooter) => {
        const scooterBrandName =
          typeof scooter.brand === "object"
            ? scooter.brand?.displayName
            : "";

        const price =
          Number(scooter.price) || 0;

        const speedValue = parseInt(
          scooter.specs?.topSpeed || "0",
          10
        );

        const rangeValue = parseInt(
          scooter.specs?.range || "0",
          10
        );

        const brandMatch =
          selectedBrand === "All Brands" ||
          scooterBrandName === selectedBrand;

        const priceMatch =
          price >= minPrice &&
          price <= maxPrice;

        let speedMatch = true;

        if (
          selectedSpeed !== "All" &&
          !Number.isNaN(speedValue)
        ) {
          if (
            selectedSpeed ===
            "Under 80 km/h"
          ) {
            speedMatch = speedValue < 80;
          } else if (
            selectedSpeed ===
            "80 - 120 km/h"
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
          if (
            selectedRange ===
            "Under 100 km"
          ) {
            rangeMatch = rangeValue < 100;
          } else if (
            selectedRange ===
            "100 - 200 km"
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
      }
    );

    if (
      sortBy === "Price: Low to High"
    ) {
      result.sort(
        (a, b) =>
          Number(a.price) -
          Number(b.price)
      );
    }

    if (
      sortBy === "Price: High to Low"
    ) {
      result.sort(
        (a, b) =>
          Number(b.price) -
          Number(a.price)
      );
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

  useEffect(() => {
    setVisibleProducts(
      INITIAL_VISIBLE_PRODUCTS
    );
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

    setVisibleProducts(
      INITIAL_VISIBLE_PRODUCTS
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

  const loadMore = () => {
    setVisibleProducts(
      (previous) => previous + 3
    );
  };

  const displayedScooters =
    filteredScooters.slice(
      0,
      visibleProducts
    );

  return (
    <main className="min-h-screen bg-[#06111A] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">
              Electric Scooters
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#8B969C]">
              Discover efficient electric scooters
              designed for comfortable everyday
              rides.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-[#8B969C]">
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

              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[400px] items-center justify-center rounded-[10px] border border-[#23333D] bg-[#0A151E]">
            <p className="text-[#78858C]">
              Loading electric scooters...
            </p>
          </div>
        )}

        {/* Error */}
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

        {/* Content */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[240px_1fr]">
            {/* Filters */}
            <aside className="h-fit rounded-xl border border-[#263640] bg-[#08131C] p-5">
              <h2 className="mb-6 text-lg font-semibold">
                Filters
              </h2>

              {/* Brand */}
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
                    className="h-11 w-full appearance-none rounded-lg border border-[#263640] bg-[#0B1720] px-3 pr-9 text-sm text-white outline-none"
                  >
                    <option>
                      All Brands
                    </option>

                    {brands.map(
                      (scooterBrand) => (
                        <option
                          key={
                            scooterBrand._id
                          }
                          value={
                            scooterBrand.displayName
                          }
                        >
                          {
                            scooterBrand.displayName
                          }
                        </option>
                      )
                    )}
                  </select>

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#89949A]">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>

              {/* Price */}
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
                        (minPrice /
                          PRICE_MAX) *
                        100
                      }%`,
                      right: `${
                        100 -
                        (maxPrice /
                          PRICE_MAX) *
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
                        PRICE_MAX -
                          500000
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

              {/* Speed */}
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

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#89949A]">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>

              {/* Range */}
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

                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#89949A]">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>

              {/* Clear */}
              <motion.button
                onClick={clearFilters}
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
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className="h-[50px] w-full rounded-lg border border-[#293943] bg-[#0A151E] text-sm font-medium text-[#D3D9DC] transition duration-200 hover:border-[#40515B] hover:bg-[#101E27]"
              >
                Clear Filters
              </motion.button>
            </aside>

            {/* Products */}
            <section className="w-full">
              {displayedScooters.length >
              0 ? (
                <>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {displayedScooters.map(
                      (
                        scooter,
                        index
                      ) => (
                        <motion.div
                          key={
                            scooter._id
                          }
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
                              index *
                              0.08,
                          }}
                          whileHover={{
                            y: -6,
                          }}
                        >
                          <Link
                            href={`/${scooter.slug}`}
                            className="group block min-w-0 overflow-hidden rounded-[10px] border border-[#23333D] bg-[#0A151E] transition duration-300 hover:-translate-y-1 hover:border-[#43545E] hover:shadow-[0_14px_35px_rgba(0,0,0,0.3)]"
                          >
                            <div className="flex h-[205px] items-center justify-center bg-white p-3.5">
                              <motion.img
                                src={
                                  scooter.imageUrl
                                }
                                alt={
                                  scooter.name
                                }
                                className="block h-full w-full object-contain transition duration-300 group-hover:scale-[1.04]"
                                whileHover={{
                                  scale: 1.07,
                                }}
                              />
                            </div>

                            <div className="px-[17px] pb-[17px] pt-2">
                              <h3 className="mb-2 truncate text-[15px] font-semibold text-[#E7EBED]">
                                {
                                  scooter.name
                                }
                              </h3>

                              <p className="mb-2 text-sm font-bold tracking-[0.2px] text-[#B9ED42]">
                                PKR{" "}
                                {Number(
                                  scooter.price
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
                                    scooter.rating
                                  }
                                </span>
                              </div>

                              <AddToCartButton
                                product={{
                                  id: scooter._id,
                                  name: scooter.name,
                                  price: Number(
                                    scooter.price
                                  ),
                                  image:
                                    scooter.imageUrl,
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

                  {/* Load More */}
                  {visibleProducts <
                    filteredScooters.length && (
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
                      className="mx-auto mt-8 block h-[50px] w-[150px] rounded-lg border border-[#293A44] bg-[#0A151E] text-sm font-semibold text-[#DCE1E4] transition duration-200 hover:border-[#42545E] hover:bg-[#111F28]"
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
                      No scooters found
                    </p>

                    <p className="mt-2 text-sm text-[#78858C]">
                      Try adjusting your
                      filters.
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
