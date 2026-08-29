import Link from "next/link";

const BRANDS = [
  "Ola Electric",
  "Ather",
  "TVS",
  "Bajaj",
  "Ampere",
  "Hero",
  "Revolt",
  "Ariel Rider",
  "Pure EV",
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
            <div
              key={brand}
              className="flex items-center justify-center rounded-lg border border-white/5 bg-white/[0.03] p-3 text-center text-xl font-semibold text-gray-300 transition-colors hover:border-lime-400/40"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}