
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
    <section className="bg-[#06111A] px-5 pb-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 px-3 pt-10 text-2xl font-bold text-white">
          Shop By Category
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className="mx-auto flex w-full max-w-[660px] overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] px-2 sm:h-[340px] sm:flex-row"
            >
              <div
                className={`flex w-65 flex-col justify-center py-7 sm:py-0 ${
                  cat.title === "Electric Scooters"
                    ? "px-10 sm:px-9"
                    : "px-8 sm:px-7"
                }`}
              >
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  {cat.title}
                </h3>

                <p className="mt-2 text-gray-400 sm:text-lg">
                  {cat.description}
                </p>

                <Link
                  href={cat.href}
                  className="mt-6 w-fit rounded-md bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-lime-300"
                >
                  {cat.cta}
                </Link>
              </div>

              <div className="relative flex h-[220px] w-full shrink-0 items-center justify-center sm:h-full sm:w-[280px] lg:w-[370px]">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 660px) 100vw, (max-width: 1024px) 280px, 300px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
