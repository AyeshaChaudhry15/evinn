import Link from "next/link";

interface Brand {
  name: string;
  logo: string;
  link: string;
}

const BRANDS: Brand[] = [
  { name: "Okla", logo: "/logos/okla.png", link: "/brands/okla" },
  { name: "Evee", logo: "/logos/evee.png", link: "/brands/evee" },
  { name: "Metro", logo: "/logos/metro.png", link: "/brands/metro" },
  { name: "Yadea", logo: "/logos/yadea.png", link: "/brands/yadea" },
  { name: "Luyuan", logo: "/logos/luyuan.png", link: "/brands/luyuan" },
  { name: "Revoo", logo: "/logos/revoo.png", link: "/brands/revoo" },
  { name: "Orevo", logo: "/logos/orevo.png", link: "/brands/orevo" },
  { name: "Jolta", logo: "/logos/jolta.png", link: "/brands/jolta" },
  { name: "United", logo: "/logos/united.png", link: "/brands/united" },
];

export default function TopBrands() {
  return (
    <section className="bg-[#06111A] px-5 pb-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Top Brands</h2>

          <Link
            href="/brands"
            className="text-sm font-semibold text-lime-400 transition-colors hover:text-lime-300"
          >
            View All Brands →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
          {BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={brand.link}
              className="flex items-center justify-center rounded-lg border border-white/5 bg-white/[0.03] p-3 text-center text-xl font-semibold text-gray-300 transition-colors hover:border-lime-400/40"
            >
              <div className="flex flex-col items-center gap-2">
                <img
                  src={brand.logo}
           
                  className="h-10 w-20 object-contain"
                />

                <span>{brand.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}