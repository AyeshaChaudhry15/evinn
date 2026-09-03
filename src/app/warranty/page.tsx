"use client";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, BatteryCharging, Settings, Check } from "lucide-react";

const warrantyCards = [
  {
    icon: ShieldCheck,
    title: "Vehicle Warranty",
    subtitle: "Up to 3 Years",
  },
  {
    icon: BatteryCharging,
    title: "Battery Warranty",
    subtitle: "Up to 5 Years",
  },
  {
    icon: Settings,
    title: "Service Support",
    subtitle: "Across Pakistan",
  },
];

const coveredItems = [
  "Battery & Motor",
  "Manufacturing Defects",
  "Controller & Electronics",
  "Software Updates",
  "Charging System",
  "Genuine Parts Replacement",
];

export default function WarrantyInfo() {
  return (
    <section className="bg-[#0b0f14] text-white py-10 sm:py-14 md:py-20">
      <div className="px-4 sm:px-6 md:px-10 max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Warranty Information
        </h2>
        <p className="text-gray-400 mt-2 mb-8 sm:mb-10 text-base sm:text-lg">
          Ride with confidence. We&apos;ve got you covered.
        </p>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
        {warrantyCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-[#12181f] px-6 py-8 sm:py-10 flex flex-col items-center text-center"
            >
              <Icon
                className="w-12 h-12 sm:w-14 sm:h-14 text-lime-400 mb-4"
                strokeWidth={1.5}
              />
              <p className="font-semibold text-white text-lg sm:text-xl">
                {card.title}
              </p>
              <p className="text-gray-400 text-base sm:text-lg mt-1">
                {card.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 max-w-5xl mx-auto">
        <div className="relative rounded-2xl border border-white/10 bg-[#12181f] overflow-hidden w-full">
          <div className="relative w-full h-48 sm:hidden">
            <Image
              src="/hero1.png"
              alt="Electric scooter"
              fill
              className="object-contain object-center"
            />
          </div>

          <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 md:max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-6">
              What&apos;s Covered?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
              {coveredItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <Check
                    className="w-5 h-5 sm:w-6 sm:h-6 text-lime-400 shrink-0"
                    strokeWidth={3}
                  />
                  <span className="text-gray-200 text-base sm:text-lg">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link href={"/check-warranty"}>
              <button className="w-full sm:w-auto rounded-full border border-lime-400/60 text-lime-300 px-6 py-2.5 text-base sm:text-lg font-medium hover:bg-lime-400/10 transition-colors">
                Check Warranty for Your Model
              </button>
            </Link>
          </div>

          <div className="hidden sm:block absolute right-0 bottom-0 w-56 md:w-80 lg:w-[28rem] h-[80%] md:h-[90%]">
            <Image
              src="/hero1.png"
              alt="Electric scooter"
              fill
              className="object-contain object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}