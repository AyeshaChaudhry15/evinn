"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const scooters = [
  {
    id: 1,
    name: "Ola S1 Pro",
    brand: "Ola",
    price: 549000,
    priceText: "PKR 549,000",
    rating: "4.8",
    image: "/images/scooter1.png",
    Link: "/ModelDetail",
  },
  {
    id: 2,
    name: "Ather 450X",
    brand: "Ather",
    price: 630500,
    priceText: "PKR 630,500",
    rating: "4.9",
    image: "/images/scooter2.png",
    Link: "/ModelDetail",
  },
  {
    id: 3,
    name: "TVS iQube",
    brand: "TVS",
    price: 799000,
    priceText: "PKR 799,000",
    rating: "4.7",
    image: "/images/scooter3.png",
    Link: "/ModelDetail",
  },
  {
    id: 4,
    name: "Bajaj Chetak",
    brand: "Bajaj",
    price: 549000,
    priceText: "PKR 549,000",
    rating: "4.8",
    image: "/images/scooter4.png",
    Link: "/ModelDetail",
  },
  {
    id: 5,
    name: "Hero Vida V1",
    brand: "Hero",
    price: 898350,
    priceText: "PKR 898,350",
    rating: "4.6",
    image: "/images/scooter5.png",
    Link: "/ModelDetail",
  },
  {
    id: 6,
    name: "Revolt RV1+",
    brand: "Revolt",
    price: 680000,
    priceText: "PKR 680,000",
    rating: "4.7",
    image: "/images/scooter6.png",
    Link: "/ModelDetail",
  },
  {
    id: 7,
    name: "Pure EV Epluto",
    brand: "Pure EV",
    price: 419000,
    priceText: "PKR 419,010",
    rating: "4.8",
    image: "/images/scooter7.png",
    Link: "/ModelDetail",
  },
  {
    id: 8,
    name: "Ampere Magnus",
    brand: "Ampere",
    price: 369500,
    priceText: "PKR 369,500",
    rating: "4.9",
    image: "/images/scooter8.png",
    Link: "/ModelDetail",
  },
  {
    id: 9,
    name: "Yamaha E01",
    brand: "Yamaha",
    price: 949000,
    priceText: "PKR 949,000",
    rating: "4.8",
    image: "/images/scooter9.png",
    Link: "/ModelDetail",
  },
  {
    id: 10,
    name: "Ola S1 Air",
    brand: "Ola",
    price: 410000,
    priceText: "PKR 410,000",
    rating: "4.6",
    image: "/images/scooter1.png",
    Link: "/ModelDetail",
  },
  {
    id: 11,
    name: "Ather 450 Plus",
    brand: "Ather",
    price: 520000,
    priceText: "PKR 520,000",
    rating: "4.7",
    image: "/images/scooter2.png",
    Link: "/ModelDetail",
  },
  {
    id: 12,
    name: "TVS iQube ST",
    brand: "TVS",
    price: 950000,
    priceText: "PKR 950,000",
    rating: "4.8",
    image: "/images/scooter3.png",
    Link: "/ModelDetail",
  },
];

export default function Vehicles() {
  const [vehicleType, setVehicleType] = useState("All Types");
  const [brand, setBrand] = useState("All Brands");
  const [topSpeed, setTopSpeed] = useState("All");
  const [range, setRange] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [price, setPrice] = useState(5000000);
  const [visibleProducts, setVisibleProducts] = useState(9);

  let filteredScooters = scooters.filter((scooter) => {
    const brandMatch = brand === "All Brands" || scooter.brand === brand;

    const priceMatch = scooter.price <= price;

    return brandMatch && priceMatch;
  });

  if (sortBy === "Price: Low to High") {
    filteredScooters.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "Price: High to Low") {
    filteredScooters.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "Newest") {
    filteredScooters.sort((a, b) => b.id - a.id);
  }

  const clearFilters = () => {
    setVehicleType("All Types");
    setBrand("All Brands");
    setTopSpeed("All");
    setRange("All");
    setSortBy("Popular");
    setPrice(5000000);
  };

  const loadMore = () => {
    setVisibleProducts((previous) => previous + 3);
  };

  const displayedScooters = filteredScooters.slice(0, visibleProducts);

  return (
    <main className="min-h-screen bg-[#06111A] px-4 py-8 text-white sm:px-6 lg:px-12 lg:py-14">
      <header className="mb-9 flex flex-col justify-between gap-7 lg:flex-row lg:items-start">
        <div>
          <h1 className="text-[32px] font-bold  sm:text-[38px] lg:text-[42px]">
           All Electric Vehicles
          </h1>

          <p className="mt-4 text-sm font-medium  text-[#8B969C] sm:text-[15px]">
           Explore our wide range of electric bikes and scooters
            <br className="hidden sm:block" />
            from top brands.
          </p>
        </div>

        <div className="flex items-center gap-4 lg:mt-3">
          <span className="text-sm text-[#AEB7BC]">Sort by</span>

          <div className="relative w-[140px]">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 w-full cursor-pointer  rounded-lg border border-[#273741] bg-[#0A151E] px-4 pr-9 text-sm text-[#DCE1E4] outline-none transition hover:border-[#40515B] focus:border-[#52656F]"
            >
              <option>Popular</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[245px_minmax(0,1fr)]">
        <aside className="h-fit rounded-[10px] border border-[#263640] bg-[#08131C]/80 p-[14px] sm:p-5 lg:min-h-[700px]">
          <h2 className="mb-7 text-[19px] font-semibold">Filters</h2>

          <div className="mb-7">
            <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
              Vehicle Type
            </label>

            <div className="relative">
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="h-12 w-full cursor-pointer rounded-lg border border-[#263640] bg-[#0B1720] px-4 pr-10 text-sm text-[#D7DCDF] outline-none transition hover:border-[#3D4E58] focus:border-[#52656F]"
              >
                <option>All Types</option>
                <option>Scooter</option>
                <option>Moped</option>
                <option>Maxi Scooter</option>
              </select>
              {/* 
              <span className=" absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#89949A]">
                <ChevronDown />
              </span> */}
            </div>
          </div>

          <div className="mb-7">
            <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
              Brand
            </label>

            <div className="relative">
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="h-12 w-full cursor-pointer  rounded-lg border border-[#263640] bg-[#0B1720] px-4 pr-10 text-sm text-[#D7DCDF] outline-none transition hover:border-[#3D4E58] focus:border-[#52656F]"
              >
                <option>All Brands</option>
                <option>Ola</option>
                <option>Ather</option>
                <option>TVS</option>
                <option>Bajaj</option>
                <option>Hero</option>
                <option>Revolt</option>
                <option>Pure EV</option>
                <option>Ampere</option>
                <option>Yamaha</option>
              </select>
            </div>
          </div>

          <div className="mb-7">
            <label className="mb-3 block pl-[2px] text-sm font-semibold text-[#D5DADD]">
              Price Range
            </label>

            <div className="mb-4 flex justify-between text-[10px] text-[#8E999E]">
              <span>PKR 0</span>
              <span>PKR 5,000,000</span>
            </div>

            <div className="relative h-6">
              <div className="absolute left-2 right-2 top-[8px] h-[5px] rounded-full bg-[#8fdf0d] shadow-[0_0_8px_rgba(145,220,24,0.3)]" />

              <input
                type="range"
                min="0"
                max="5000000"
                step="50000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="absolute left-0 top-0 h-6 w-full cursor-pointer appearance-none bg-transparent opacity-0"
              />

              <div className=" absolute left-0 top-[1px] h-[18px] w-[18px] rounded-full bg-[#8fdf0d] shadow-[0_0_9px_rgba(201,255,115,0.4)]" />

              <div
                className=" absolute top-[1px] h-[18px] w-[18px] rounded-full bg-[#8fdf0d] shadow-[0_0_9px_rgba(201,255,115,0.4)]"
                style={{
                  right: `${100 - (price / 5000000) * 100}%`,
                  transform: "translateX(50%)",
                }}
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
                <option>Under 60 km/h</option>
                <option>60 - 90 km/h</option>
                <option>90+ km/h</option>
              </select>

              <span className=" absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#89949A]">
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
                className="h-12 w-full cursor-pointer rounded-lg border border-[#263640] bg-[#0B1720] px-4 pr-10 text-sm text-[#D7DCDF] outline-none transition hover:border-[#3D4E58] focus:border-[#52656F]"
              >
                <option>All</option>
                <option>Under 80 km</option>
                <option>80 - 150 km</option>
                <option>150+ km</option>
              </select>

              <span className=" absolute right-4 top-1/2 -translate-y-1/2 text-base text-[#89949A]">
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
          {displayedScooters.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {displayedScooters.map((scooter) => (
                <article
                  key={scooter.id}
                  className="group min-w-0 overflow-hidden rounded-[10px] border border-[#23333D] bg-[#0A151E] transition duration-300 hover:-translate-y-1 hover:border-[#43545E] hover:shadow-[0_14px_35px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex h-[205px] items-center justify-center bg-[radial-gradient(ellipse_at_center,rgba(43,58,66,0.30),transparent_67%)] p-3.5">
                    <img
                      src={scooter.image}
                      alt={scooter.name}
                      className="block h-full w-full object-contain drop-shadow-[0_13px_9px_rgba(0,0,0,0.55)] transition duration-300 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="px-[17px] pb-[17px] pt-2">
                    <h3 className="mb-2  text-[15px] font-semibold text-[#E7EBED]">
                      {scooter.name}
                    </h3>

                    <p className="mb-2 text-sm font-bold tracking-[0.2px] text-[#B9ED42]">
                      {scooter.priceText}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-[#6F7B81]">
                      <span className="text-[13px] text-[#B9ED42]">★</span>

                      <span>{scooter.rating}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] items-center justify-center rounded-[10px] border border-[#23333D] bg-[#0A151E]">
              <div className="text-center">
                <p className="text-lg font-semibold text-[#DCE1E4]">
                  No scooters found
                </p>

                <p className="mt-2 text-sm text-[#78858C]">
                  Try changing your filters.
                </p>
              </div>
            </div>
          )}

          {visibleProducts < filteredScooters.length && (
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
