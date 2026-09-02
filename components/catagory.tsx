
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    title: "Electric Bikes",
    description: "High Performance. Zero Emission.",
    cta: "Explore Bikes",
    image: "/hero3.png",
    href: "/ElectricBikes",
  },
  {
    title: "Electric Scooters",
    description: "Smart, Stylish, Sustainable.",
    cta: "Explore Scooters",
    image: "/hero2.png",
    href: "/ElectricScooters",
  },
];

export default function Category() {
  return (
    <section className="bg-[#06111A] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="mb-4 text-center text-2xl font-bold text-white sm:mb-8 sm:text-4xl lg:text-left lg:text-4xl">
          Shop By Category
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="flex w-full flex-col overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] transition-transform duration-300 hover:-translate-y-1 hover:bg-white/[0.05] sm:min-h-[420px] md:min-h-[360px] lg:min-h-[340px] lg:flex-row"
            >
              <div className="flex w-full flex-col items-center justify-center px-5 py-7 text-center sm:px-8 sm:py-8 md:px-8 lg:w-[48%] lg:items-start lg:px-7 lg:py-0 lg:text-left xl:px-9">
                <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                  {cat.title}
                </h3>

                <p className="mt-2 max-w-[320px] text-sm leading-relaxed text-gray-400 sm:text-base lg:text-sm xl:text-base">
                  {cat.description}
                </p>

                <Link
                  href={cat.href}
                  className="mt-5 inline-flex items-center justify-center rounded-md bg-lime-400 px-5 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:bg-lime-300 hover:shadow-lg hover:shadow-lime-400/20 sm:mt-6 sm:px-6 sm:py-3"
                >
                  {cat.cta}
                </Link>
              </div>

              <div className="relative h-[210px] w-full shrink-0 sm:h-[250px] md:h-[260px] lg:h-full lg:w-[52%] xl:min-h-[340px]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-3 sm:p-4 lg:p-2 xl:p-3"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

