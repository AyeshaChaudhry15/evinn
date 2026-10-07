"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Network,
  UserCog,
  Timer,
  Cog,
  ChevronDown,
} from "lucide-react";

interface Vehicle {
  _id: string;
  name: string;
  brand: {
    _id: string;
    displayName: string;
    logoUrl?: string;
  };
  type: string;
  price: number;
  rating: number;
  imageUrl: string;
  slug: string;
}

interface BikesResponse {
  bikes: Vehicle[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

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

const cities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Faisalabad",
];

export default function AfterSalesService() {
  const [allVehicles, setAllVehicles] = useState<Vehicle[]>([]);
  const [vehicle, setVehicle] = useState("");
  const [city, setCity] = useState(cities[0]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://evinn.evermontech.com/api/bikes?page=1&limit=100",
        );

        const data: BikesResponse & {
          message?: string;
        } = await response.json().catch(() => ({
          bikes: [],
        }));

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Failed to load vehicles.",
          );
        }

        const vehicles = data.bikes || [];

        setAllVehicles(vehicles);

        if (vehicles.length > 0) {
          setVehicle(vehicles[0].name);
        }
      } catch (err) {
        console.error(
          "After Sales Vehicles API Error:",
          err,
        );

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while loading vehicles.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <section className="bg-[#0b0f14] px-4 py-14 text-white sm:px-10">
      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            After Sales &amp; Service
          </h2>

          <p className="mt-2 mb-10 text-lg text-gray-400">
            We are always here to keep you moving.
          </p>
        </motion.div>

        {/* Features */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#12181f] px-4 py-8 text-center"
              >
                <motion.div
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon
                    className="mb-4 h-13 w-13 text-lime-400"
                    strokeWidth={1.5}
                  />
                </motion.div>

                <p className="text-lg text-white">
                  {f.title}
                  <br />
                  {f.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Service Booking */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#12181f]"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 1.05,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
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
            initial={{
              opacity: 0,
              x: -40,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            className="relative z-10 max-w-sm bg-black/30 px-6 py-8 sm:px-10 sm:py-10"
          >
            <motion.h3
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
              className="mb-6 text-3xl font-bold sm:text-4xl"
            >
              Book a Service
            </motion.h3>

            <div className="space-y-5">

              {/* Vehicle */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.4,
                }}
              >
                <label className="mb-2 block text-lg text-gray-400">
                  Select Vehicle
                </label>

                <div className="relative">
                  <select
                    value={vehicle}
                    onChange={(e) =>
                      setVehicle(e.target.value)
                    }
                    disabled={
                      loading ||
                      allVehicles.length === 0
                    }
                    className="w-full appearance-none border border-white/15 bg-[#0b0f14] px-5 py-3 pr-10 text-white focus:border-lime-400/60 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <option value="">
                        Loading vehicles...
                      </option>
                    ) : allVehicles.length === 0 ? (
                      <option value="">
                        No vehicles available
                      </option>
                    ) : (
                      allVehicles.map((v) => (
                        <option
                          key={v._id}
                          value={v.name}
                        >
                          {v.name}
                        </option>
                      ))
                    )}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>

                {error && (
                  <p className="mt-2 text-xs text-red-400">
                    {error}
                  </p>
                )}
              </motion.div>

              {/* City */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.5,
                }}
              >
                <label className="mb-2 block text-lg text-gray-400">
                  City
                </label>

                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    className="w-full appearance-none border border-white/15 bg-[#0b0f14] px-5 py-3 pr-10 text-base text-white focus:border-lime-400/60 focus:outline-none"
                  >
                    {cities.map((c) => (
                      <option
                        key={c}
                        value={c}
                      >
                        {c}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
              </motion.div>

              {/* Button */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.6,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={
                    vehicle
                      ? `/service-booking?vehicle=${encodeURIComponent(
                          vehicle,
                        )}&city=${encodeURIComponent(
                          city,
                        )}`
                      : "#"
                  }
                  onClick={(e) => {
                    if (!vehicle) {
                      e.preventDefault();
                    }
                  }}
                  className="block w-full rounded-2xl bg-lime-400 px-6 py-3.5 text-center text-base font-semibold text-[#0b0f14] transition-colors hover:bg-lime-300"
                >
                  Book a Service
                </Link>
              </motion.div>

            </div>
          </motion.div>

          <div className="hidden h-[420px] sm:block" />
        </motion.div>
      </div>
    </section>
  );
}