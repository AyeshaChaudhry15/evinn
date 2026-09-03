import Link from "next/link";

interface Brand {
  name: string;
  logo: string;
  link: string;
}

const BRANDS: Brand[] = [
  { name: "Okla", logo: "/okla.png", link: "/brands/okla" },
  { name: "Evee", logo: "/evee.png", link: "/brands/evee" },
  { name: "Metro", logo: "/metro.jfif", link: "/brands/metro" },
  { name: "Yadea", logo: "/yadea.png", link: "/brands/yadea" },

];

export default function TopBrands() {
  return (
    <section className="bg-[#06111A] px-5 pb-8 lg:px-8 pt-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-4xl font-bold text-white">Top Brands</h2>

          <Link
            href="/brands"
            className="text-sm font-semibold text-lime-400 transition-colors hover:text-lime-300"
          >
            View All Brands →
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-4">
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