"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import AddToCartButton from "../../../components/add-to-cart";
import { request } from "@/lib/api"

interface Brand {
  _id: string;
  displayName: string;
  logoUrl: string;
  origin?: string;
}

interface BikeSpecs {
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
  slug: string;
  brand: {
    _id: string;
    displayName: string;
    logoUrl?: string;
  };
  type: "bike" | "scooter";
  price: number;
  rating: number;
  imageUrl: string;
  specs?: BikeSpecs;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface BikesResponse {
  bikes: Vehicle[];
  pagination: Pagination;
}

interface BrandsResponse {
  brands: Brand[];
}

const PRICE_MIN = 0;
const PRICE_STEP = 50000;
const MIN_GAP = 50000;

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [vehicleType, setVehicleType] = useState("All Types");
  const [brand, setBrand] = useState("All Brands");
  const [topSpeed, setTopSpeed] = useState("All");
  const [range, setRange] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");

  const [minPrice, setMinPrice] = useState(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [priceLimit, setPriceLimit] = useState(5000000);

  const [visibleProducts, setVisibleProducts] = useState(9);

  useEffect(() => {
    let mounted = true;

    const loadVehicles = async () => {
      try {
        setLoading(true);
        setError("");

        const firstPage = await request<BikesResponse>("/bikes", {
          query: {
            page: 1,
            limit: 100,
          },
        });

        let allVehicles = [...firstPage.bikes];

        let currentPage = 1;
        let hasNextPage = firstPage.pagination?.hasNextPage ?? false;

        while (hasNextPage) {
          currentPage += 1;

          const nextPage = await request<BikesResponse>("/bikes", {
            query: {
              page: currentPage,
              limit: 100,
            },
          });

          allVehicles = [...allVehicles, ...nextPage.bikes];

          hasNextPage = nextPage.pagination?.hasNextPage ?? false;
        }

        const brandsResponse = await request<BrandsResponse>("/brands");

        if (!mounted) {
          return;
        }

        setVehicles(allVehicles);
        setBrands(brandsResponse.brands || []);

        const highestPrice = allVehicles.reduce(
          (highest, vehicle) =>
            Math.max(highest, Number(vehicle.price) || 0),
          0,
        );

        const calculatedMax = Math.max(
          5000000,
          Math.ceil(highestPrice / PRICE_STEP) * PRICE_STEP,
        );

        setPriceLimit(calculatedMax);
        setMaxPrice(calculatedMax);
      } catch (err) {
        if (!mounted) {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load vehicles.",
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadVehicles();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredVehicles = useMemo(() => {
    const filtered = vehicles.filter((vehicle) => {
      const brandMatch =
        brand === "All Brands" ||
        vehicle.brand?.displayName === brand;

      const typeMatch =
        vehicleType === "All Types" ||
        (vehicleType === "Bike" && vehicle.type === "bike") ||
        (vehicleType === "Scooter" &&
          vehicle.type === "scooter");

      const priceMatch =
        vehicle.price >= minPrice &&
        vehicle.price <= maxPrice;

      let speedMatch = true;

      if (topSpeed !== "All") {
        const speedValue = parseInt(
          vehicle.specs?.topSpeed || "0",
        );

        if (topSpeed === "Under 60 km/h") {
          speedMatch = speedValue < 60;
        }

        if (topSpeed === "60 - 90 km/h") {
          speedMatch =
            speedValue >= 60 && speedValue <= 90;
        }

        if (topSpeed === "90+ km/h") {
          speedMatch = speedValue > 90;
        }
      }

      let rangeMatch = true;

      if (range !== "All") {
        const rangeValue = parseInt(
          vehicle.specs?.range || "0",
        );

        if (range === "Under 80 km") {
          rangeMatch = rangeValue < 80;
        }

        if (range === "80 - 150 km") {
          rangeMatch =
            rangeValue >= 80 && rangeValue <= 150;
        }

        if (range === "150+ km") {
          rangeMatch = rangeValue > 150;
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
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "Newest") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() -
          new Date(a.createdAt).getTime(),
      );
    }

    return filtered;
  }, [
    vehicles,
    brand,
    vehicleType,
    minPrice,
    maxPrice,
    topSpeed,
    range,
    sortBy,
  ]);

  const displayedVehicles = filteredVehicles.slice(
    0,
    visibleProducts,
  );

  const clearFilters = () => {
    setVehicleType("All Types");
    setBrand("All Brands");
    setTopSpeed("All");
    setRange("All");
    setSortBy("Popular");
    setMinPrice(PRICE_MIN);
    setMaxPrice(priceLimit);
    setVisibleProducts(9);
  };

  const loadMore = () => {
    setVisibleProducts((previous) => previous + 3);
  };

  const handleMinChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Math.min(
      Number(e.target.value),
      maxPrice - MIN_GAP,
    );

    setMinPrice(value);
    setVisibleProducts(9);
  };

  const handleMaxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Math.max(
      Number(e.target.value),
      minPrice + MIN_GAP,
    );

    setMaxPrice(value);
    setVisibleProducts(9);
  };

  const formatPrice = (price: number) => {
    return `PKR ${new Intl.NumberFormat("en-PK").format(
      price,
    )}`;
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

          <motion.div className="mb-7">
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

          <motion.div className="mb-7">
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

                {brands.map((item) => (
                  <option
                    key={item._id}
                    value={item.displayName}
                  >
                    {item.displayName}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#89949A]">
                <ChevronDown size={18} />
              </span>
            </div>
          </motion.div>

          <motion.div className="mb-7">
            <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
              Price Range
            </label>

            <div className="mb-4 flex justify-between text-[10px] text-[#8E999E]">
              <span>
                PKR {minPrice.toLocaleString("en-PK")}
              </span>

              <span>
                PKR {maxPrice.toLocaleString("en-PK")}
              </span>
            </div>

            <div className="relative h-6">
              <div className="absolute left-2 right-2 top-[8px] h-[5px] rounded-full bg-[#1c2830]" />

              <div
                className="absolute top-[8px] h-[5px] rounded-full bg-[#8fdf0d]"
                style={{
                  left: `${(minPrice / priceLimit) * 100}%`,
                  right: `${
                    100 - (maxPrice / priceLimit) * 100
                  }%`,
                }}
              />

              <input
                type="range"
                min={PRICE_MIN}
                max={priceLimit}
                step={PRICE_STEP}
                value={minPrice}
                onChange={handleMinChange}
                className="range-thumb absolute left-0 top-0 h-6 w-full appearance-none bg-transparent"
              />

              <input
                type="range"
                min={PRICE_MIN}
                max={priceLimit}
                step={PRICE_STEP}
                value={maxPrice}
                onChange={handleMaxChange}
                className="range-thumb absolute left-0 top-0 h-6 w-full appearance-none bg-transparent"
              />
            </div>
          </motion.div>

          <motion.div className="mb-7">
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

          <motion.div className="mb-8">
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
            <div className="flex min-h-[400px] items-center justify-center rounded-[10px] border border-[#23333D] bg-[#0A151E]">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#263640] border-t-[#8fdf0d]" />

                <p className="mt-4 text-sm text-[#78858C]">
                  Loading vehicles...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex min-h-[400px] items-center justify-center rounded-[10px] border border-[#23333D] bg-[#0A151E] px-5">
              <div className="text-center">
                <p className="text-lg font-semibold text-white">
                  Unable to load vehicles
                </p>

                <p className="mt-2 text-sm text-[#78858C]">
                  {error}
                </p>
              </div>
            </div>
          ) : displayedVehicles.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {displayedVehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle._id}
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
                    href={`/${vehicle.slug}`}
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
                      <h3 className="mb-2 text-[15px] font-semibold text-[#E7EBED]">
                        {vehicle.name}
                      </h3>

                      <p className="mb-2 text-sm font-bold tracking-[0.2px] text-[#B9ED42]">
                        {formatPrice(vehicle.price)}
                      </p>

                      <div className="mb-3 flex items-center justify-between text-xs text-[#6F7B81]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[13px] text-[#B9ED42]">
                            ★
                          </span>

                          <span>
                            {vehicle.rating || 0}
                          </span>
                        </div>

                        <span className="text-[#75828A]">
                          {vehicle.brand?.displayName}
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

          {!loading &&
            !error &&
            visibleProducts <
              filteredVehicles.length && (
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
        </section>
      </div>
    </main>
  );
}