import Image from "next/image";
import Link from "next/link";
import { Home as HomeIcon, ThumbsUp, Wallet } from "lucide-react";

const STATS = [
  { icon: HomeIcon, label: "10+ Trusted Brands" },
  { icon: HomeIcon, label: "50+ Models" },
  { icon: HomeIcon, label: "Best Prices" },
  { icon: ThumbsUp, label: "Easy Financing" },
  { icon: Wallet, label: "After Sales Support" },
];

export default function Hero() {
  return (
    <section className="bg-[#06111A] px-5 lg:px-8 w-full pt-10">
      <div className="mx-auto grid max-w-7xl items-center gap-2 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            The Future <br />
            Moves <span className="text-lime-400">Electric</span>
          </h1>

          <p className="mt-6 max-w-md text-gray-400 text-base sm:text-xl">
            Explore 10+ Trusted Brands, 50+ Models. One Destination.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-md bg-lime-400 px-6 py-4 text-md font-semibold text-black transition-colors hover:bg-lime-300">
              <Link href={"/Vehicles"}>Explore Vehicles</Link>
            </button>

            <button className="rounded-md border border-white/20 px-6 py-4 text-md font-semibold text-white transition-colors hover:border-lime-400 hover:text-lime-400">
              Compare Vehicles
            </button>
          </div>
        </div>

        <div className="relative h-[250px] w-full sm:h-[320px] md:h-[350px] lg:h-[430px] lg:-ml-10">
          <Image
            src="/hero1.png"
            alt="Electric motorbike"
            fill
            priority
            className="object-contain object-center lg:object-right"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 py-8 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0 lg:py-0 lg:h-25">
        {STATS.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.03] px-4 py-4"
          >
            <Icon className="text-lime-400" size={30} />
            <span className="text-lg font-medium text-gray-200">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}