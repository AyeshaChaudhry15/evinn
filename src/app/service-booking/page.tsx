"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Network, UserCog, Timer, Cog, ChevronDown } from "lucide-react";

import vehiclesData from "../../bike-details/bikes-scooter.json";

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

const allVehicles = [...vehiclesData.bikes, ...vehiclesData.scooters];

const cities = ["Lahore", "Karachi", "Islamabad", "Faisalabad"];

export default function AfterSalesService() {
  const [vehicle, setVehicle] = useState(allVehicles[0]?.name || "");

  const [city, setCity] = useState(cities[0]);

  return (
    <section className="bg-[#0b0f14] text-white py-14 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold">
            After Sales &amp; Service
          </h2>

          <p className="text-gray-400 mt-2 mb-10 text-lg">
            We are always here to keep you moving.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/10 bg-[#12181f] px-4 py-8 flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon
                    className="w-13 h-13 text-lime-400 mb-4"
                    strokeWidth={1.5}
                  />
                </motion.div>

                <p className="text-white text-lg">
                  {f.title}
                  <br />
                  {f.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl border border-white/10 bg-[#12181f] overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src="/service.jpeg"
              alt="EVINN service center"
              fill
              className="object-cover object-right"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#12181f] via-[#12181f]/90 sm:via-[#12181f]/70 to-transparent sm:to-[#12181f]/0" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 max-w-sm bg-black/30"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-3xl sm:text-4xl font-bold mb-6"
            >
              Book a Service
            </motion.h3>

            <div className="space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label className="block text-gray-400 text-lg mb-2">
                  Select Vehicle
                </label>

                <div className="relative ">
                  <select
                    value={vehicle}
                    onChange={(e) => setVehicle(e.target.value)}
                    className="w-full appearance-none border border-white/15 bg-[#0b0f14] px-5 py-3 pr-10 text-white  focus:outline-none focus:border-lime-400/60"
                  >
                    {allVehicles.map((v) => (
                      <option key={v.id} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/service-booking?vehicle=${encodeURIComponent(
                    vehicle,
                  )}&city=${encodeURIComponent(city)}`}
                  className="block w-full rounded-2xl bg-lime-400 text-[#0b0f14] font-semibold px-6 py-3.5 text-base text-center hover:bg-lime-300 transition-colors"
                >
                  Book a Service
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <div className="hidden sm:block h-[420px]" />
        </motion.div>
      </div>
    </section>
  );
}