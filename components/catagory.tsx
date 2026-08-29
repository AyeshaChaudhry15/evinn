import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    title: "Electric Bikes",
    description: "High Performance. Zero Emission.",
    cta: "Explore Bikes",
    image: "/hero3.webp",
    href: "/ElectricBikes",
  },
  {
    title: "Electric Scooters",
    description: "Smart, Stylish, Sustainable.",
    cta: "Explore Scooters",
    image: "/hero2.webp",
    href: "/ElectricScooters",
  },
];

export default function Category() {
  return (
    <section className="bg-[#06111A] px-5 pb-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-6 text-2xl font-bold text-white mt-10 px-3">Shop By Category</h2>

        <div className="grid gap-6 sm:grid-cols-2 justify-items-center">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              className=" mx-auto flex h-[340px] w-full max-w-[600px]  overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] px-4"
            >
              <div className="flex w-1/2 flex-col justify-center text-left px-3">
                <h3 className="text-3xl font-bold text-white">{cat.title}</h3>
                <p className="mt-2 text-lg text-gray-400">{cat.description}</p>
                <button className="mt-6 w-fit rounded-md bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-lime-300">
                  <Link href={cat.href}> {cat.cta}</Link>
                </button>
              </div>

              <div className="relative h-full w-1/2">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}