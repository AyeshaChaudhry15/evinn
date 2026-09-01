
"use client";

import Link from "next/link";

interface Brand {
  name: string;
  logo: string;
  link: string;
}

const brands: Brand[] = [
  {
    name: "Okla",
    logo: "/logos/okla.png",
    link: "/brands/okla",
  },
  {
    name: "Evee",
    logo: "/logos/evee.png",
    link: "/brands/evee",
  },
  {
    name: "Metro",
    logo: "/logos/metro.png",
    link: "/brands/metro",
  },
  {
    name: "Yadea",
    logo: "/logos/yadea.png",
    link: "/brands/yadea",
  },
  {
    name: "Luyuan",
    logo: "/logos/luyuan.png",
    link: "/brands/luyuan",
  },
  {
    name: "Revoo",
    logo: "/logos/revoo.png",
    link: "/brands/revoo",
  },
  {
    name: "Orevo",
    logo: "/logos/orevo.png",
    link: "/brands/orevo",
  },
  {
    name: "Jolta",
    logo: "/logos/jolta.png",
    link: "/brands/jolta",
  },
  {
    name: "United",
    logo: "/logos/united.png",
    link: "/brands/united",
  },
  {
    name: "Crown CMC",
    logo: "/logos/crown-cmc.png",
    link: "/brands/crown-cmc",
  },
  {
    name: "Road King",
    logo: "/logos/road-king.png",
    link: "/brands/road-king",
  },
  {
    name: "EVINN",
    logo: "/logos/evinn.png",
    link: "/brands/evinn",
  },
  {
    name: "Horwin",
    logo: "/logos/horwin.png",
    link: "/brands/horwin",
  },
  {
    name: "Velectra",
    logo: "/logos/velectra.png",
    link: "/brands/velectra",
  },
  {
    name: "ECruze",
    logo: "/logos/ecruze.png",
    link: "/brands/ecruze",
  },
  {
    name: "Eveon",
    logo: "/logos/eveon.png",
    link: "/brands/eveon",
  },
  {
    name: "Jinpeng",
    logo: "/logos/jinpeng.png",
    link: "/brands/jinpeng",
  },
  {
    name: "Hi Speed",
    logo: "/logos/hi-speed.png",
    link: "/brands/hi-speed",
  },
];

export default function Brands() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#081019] px-4 py-5 sm:px-5 md:px-6 lg:h-screen lg:overflow-hidden">
      <div className="mx-auto max-w-[1200px]">

        <div className="mb-5">
          <h1 className="text-2xl font-bold text-[#E8EBF2] sm:text-3xl">
            All Brands
          </h1>

          <p className="mt-1 text-base text-[#A8B0BE] sm:text-lg">
            Explore the electric vehicle brands
            in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.link}
              className="
                flex
                h-[105px]
                items-center
                justify-center
                rounded-lg
                border
                border-[#1D2A36]
                bg-[#101923]
                transition
                hover:border-lime-300
                hover:bg-[#14212C]
              "
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-[38px] w-[75px] object-contain sm:w-[85px]"
                />

                <span className="text-xs font-medium text-[#E8EBF2] sm:text-sm">
                  {brand.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
};
