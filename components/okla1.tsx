"use client";

import Image from "next/image";
import { MapPin, Bike, Smartphone, Zap } from "lucide-react";

interface Product {
  name: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    name: "Okla S1 Pro",
    price: "PKR 849,000",
 image: "/hero1.png",  },
  {
    name: "Okla S1",
    price: "PKR 749,000",
 image: "/hero3.png",  },
  {
    name: "Okla S1X",
    price: "PKR 699,000",
 image: "/hero1.png",  },
  {
    name: "Okla S1 Lite",
    price: "PKR 599,000",
 image: "/hero3.png",  },
];

const colors = [
  "bg-[#22252A]",
  "bg-[#E94B4B]",
  "bg-[#F3D37A]",
  "bg-[#81946D]",
  "bg-[#9BC6B6]",
];

export default function Okla() {
  return (
    <main className="min-h-screen bg-[#06111A] px-4 py-5 text-white sm:px-5 sm:py-6 md:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-xl p-4 sm:p-6 lg:p-8">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="w-full">
              <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                Okla S1 Pro
              </h1>

              <p className="mt-3 text-2xl font-bold text-lime-400 sm:text-3xl">
                PKR 849,000
              </p>

              <p className="mt-4 max-w-md text-md leading-6 text-gray-400 sm:text-md">
                Ride a more advanced electric scooter with cutting-edge
                technology, smart performance and modern design.
              </p>

              <div className="mt-6 grid max-w-md grid-cols-2 gap-x-4 gap-y-3 text-md sm:text-lg">
                <span className="text-gray-400">Top Speed</span>
                <span className="text-white">90 km/h</span>

                <span className="text-gray-400">Range</span>
                <span className="text-white">110 km</span>

                <span className="text-gray-400">Battery</span>
                <span className="text-white">4 kWh</span>

                <span className="text-gray-400">Charging Time</span>
                <span className="text-white">6.5 hrs</span>

                <span className="text-gray-400">Motor Power</span>
                <span className="text-white">8.5 kW</span>
              </div>

              <div className="mt-6">
                <p className="mb-3 text-md text-gray-400">Colors</p>

                <div className="flex flex-wrap gap-3">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className={`h-6 w-6 shrink-0 rounded-full border-2 border-gray-500 ${color} ${
                        index === 1
                          ? "ring-2 ring-lime-400 ring-offset-2 ring-offset-[#091923]"
                          : ""
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-5 text-sm font-medium text-lime-400 sm:text-md">
                ● 6 in Stock
              </p>
            </div>

            <div className="flex w-full items-center justify-center">
              <Image
                src="/hero1.png"
                alt="Okla S1 Pro"
                width={650}
                height={450}
                className="h-auto max-h-[350px] w-full max-w-[650px] object-contain sm:max-h-[400px]"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-end">
            {products.map((product) => (
              <button
                key={product.name}
                className="flex h-16 w-28 shrink-0 items-center justify-center rounded-md border border-white/10 bg-[#101D27] transition hover:border-lime-400/50 sm:w-30"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={90}
                  height={60}
                  className="h-12 w-24 object-contain sm:w-25"
                />
              </button>
            ))}
          </div>
        </section>

        <section className="mt-5 rounded-xl shadow-2xs bg-[#101923] p-4 sm:p-6">
          <div className="flex gap-6 overflow-x-auto border-b border-white/10 sm:gap-10">
            <button className="shrink-0 border-b-2 border-lime-400 pb-3 text-lg font-semibold text-lime-400">
              Overview
            </button>

            <button className="shrink-0 pb-3 text-lg font-semibold text-gray-400 hover:text-white">
              Specifications
            </button>

            <button className="shrink-0 pb-3 text-lg font-semibold text-gray-400 hover:text-white">
              Features
            </button>

            <button className="shrink-0 pb-3 text-lg font-semibold text-gray-400 hover:text-white">
              Reviews
            </button>
          </div>

          <div className="mt-6">
            <p className="max-w-2xl text-md leading-6 text-gray-400 sm:text-md">
              The Okla S1 Pro offers exceptional performance, long range and
              smart features for an enjoyable everyday riding experience.
            </p>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3">
              <div className="shrink-0 rounded-full border border-lime-400/30 p-2 text-lime-400">
                <MapPin size={40} />
              </div>

              <span className="text-sm text-gray-300 sm:text-md">
                Cruise Control
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="shrink-0 rounded-full border border-lime-400/30 p-2 text-lime-400">
                <Bike size={40} />
              </div>

              <span className="text-sm text-gray-300 sm:text-md">
                Reverse Mode
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="shrink-0 rounded-full border border-lime-400/30 p-2 text-lime-400">
                <Smartphone size={40} />
              </div>

              <span className="text-sm text-gray-300 sm:text-md">
                Smart App
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="shrink-0 rounded-full border border-lime-400/30 p-2 text-lime-400">
                <Zap size={40} />
              </div>

              <span className="text-sm text-gray-300 sm:text-md">
                Regenerative Braking
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-lg bg-[#8fdf0d] px-5 py-2.5 text-sm font-semibold text-[#0B0F0C] transition-colors hover:bg-[#a3f722]">
              Book a Test Ride
            </button>

            <button className="rounded-lg bg-[#8fdf0d] px-5 py-2.5 text-sm font-semibold text-[#0B0F0C] transition-colors hover:bg-[#a3f722]">
              Compare
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
