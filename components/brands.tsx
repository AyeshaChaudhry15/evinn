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
    logo: "okla.png",
    link: "/brands/okla",
  },
  {
    name: "Evee",
    logo: "evee.png",
    link: "/brands/evee",
  },
  {
    name: "Metro",
    logo: "metro.png",
    link: "/brands/metro",
  },
  {
    name: "Yadea",
    logo: "yadea.png",
    link: "/brands/yadea",
  },
  {
    name: "Luyuan",
    logo: "luyuan.png",
    link: "/brands/luyuan",
  },
  {
    name: "Revoo",
    logo: "revoo.png",
    link: "/brands/revoo",
  },
  {
    name: "Orevo",
    logo: "orevo.png",
    link: "/brands/orevo",
  },
  {
    name: "Jolta",
    logo: "jolta.png",
    link: "/brands/jolta",
  },
  {
    name: "United",
    logo: "united.png",
    link: "/brands/united",
  },
  {
    name: "Crown CMC",
    logo: "crown-cmc.png",
    link: "/brands/crown-cmc",
  },
  {
    name: "Road King",
    logo: "road-king.png",
    link: "/brands/road-king",
  },
  {
    name: "EVINN",
    logo: "evinn.png",
    link: "/brands/evinn",
  },
  {
    name: "Horwin",
    logo: "horwin.png",
    link: "/brands/horwin",
  },
  {
    name: "Velectra",
    logo: "velectra.png",
    link: "/brands/velectra",
  },
  {
    name: "ECruze",
    logo: "ecruze.png",
    link: "/brands/ecruze",
  },
  {
    name: "Eveon",
    logo: "eveon.png",
    link: "/brands/eveon",
  },
  {
    name: "Jinpeng",
    logo: "jinpeng.png",
    link: "/brands/jinpeng",
  },
  {
    name: "Hi Speed",
    logo: "hi-speed.png",
    link: "/brands/hi-speed",
  },
];

export default function Brands() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#081019] py-5 sm:px-2  lg:h-screen lg:overflow-hidden">
      <div className="mx-auto max-w-[1300px] pt-10">
        <div className="mb-5">
          <h1 className="text-4xl font-bold text-[#E8EBF2] sm:text-5xl ">
            All Brands
          </h1>

          <p className="mt-1 text-lg text-[#A8B0BE] sm:text-xl">
            Explore the electric vehicle brands in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.link}
              className="
                flex
                h-[100px]
                items-center
                justify-center
                rounded-lg
                border
                border-[#1D2A36]
                bg-[#101923]
                transition-all
                duration-200
                hover:border-lime-300
                hover:bg-[#14212C]
              "
            >
              <div className="flex w-full flex-col items-center justify-center gap-1.5 px-2">
                <div className="flex h-[95px] w-[92%] items-center justify-center">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* <span
                  className="
                    text-[11px]
                    font-medium
                    leading-tight
                    text-[#E8EBF2]
                    sm:text-xs
                  "
                >
                  {brand.name}
                </span> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
