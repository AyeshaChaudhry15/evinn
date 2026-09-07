"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Network,
  UserCog,
  Timer,
  Cog,
  ChevronDown,
} from "lucide-react";

const features = [
  {
    icon: Network,
    title: "Nationwide",
    subtitle: "Service Network",
  },
  {
    icon: UserCog,
    title: "Trained",
    subtitle: "EV Technicians",
  },
  {
    icon: Timer,
    title: "Quick",
    subtitle: "Turnaround Time",
  },
  {
    icon: Cog,
    title: "Genuine",
    subtitle: "Spare Parts",
  },
];

const vehicles = ["Ola S1 Pro", "Ola S1 pro max", "Ola S1 ultra"];
const cities = ["Lahore", "Karachi", "Islamabad", "Faisalabad"];

export default function AfterSalesService() {
  const [vehicle, setVehicle] = useState(vehicles[0]);
  const [city, setCity] = useState(cities[0]);

  return (
    <section className="bg-[#0b0f14] text-white py-14 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl sm:text-4xl font-bold">
          After Sales &amp; Service
        </h2>
        <p className="text-gray-400 mt-2 mb-10 text-lg">
          We are always here to keep you moving.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-[#12181f] px-4 py-8 flex flex-col items-center text-center"
              >
                <Icon
                  className="w-13 h-13 text-lime-400 mb-4"
                  strokeWidth={1.5}
                />
                <p className="text-white text-lg">
                  {f.title}
                  <br />
                  {f.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        <div className="relative rounded-2xl border border-white/10 bg-[#12181f] overflow-hidden">

          <div className="absolute inset-0">
            <Image
              src="/service.jpeg"
              alt="EVINN service center"
              fill
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#12181f] via-[#12181f]/90 sm:via-[#12181f]/70 to-transparent sm:to-[#12181f]/0" />
          </div>

          <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 max-w-sm bg-black/30">
            <h3 className="text-3xl sm:text-4xl font-bold mb-6">
              Book a Service
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-gray-400 text-lg mb-2">
                  Select Vehicle
                </label>
                <div className="relative">
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full appearance-none  border border-white/15 bg-[#0b0f14] px-5 py-3 pr-10 text-white text-base focus:outline-none focus:border-lime-400/60"
                  >
                    {vehicles.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-lg mb-2">
                  City
                </label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full appearance-none border border-white/15 bg-[#0b0f14] px-5 py-3 pr-10 text-white text-base focus:outline-none focus:border-lime-400/60"
                  >
                    {cities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button className="w-full rounded-2xl bg-lime-400 text-[#0b0f14] font-semibold px-6 py-3.5 text-base hover:bg-lime-300 transition-colors">
                Book a Service
              </button>
            </div>
          </div>

          <div className="hidden sm:block h-[420px]" />
        </div>
      </div>
    </section>
  );
}