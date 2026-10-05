
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  Calendar as CalendarIcon,
  KeyRound,
  ShieldCheck,
  Zap,
} from "lucide-react";

import bikeData from "../../bike-details/bikes-scooter.json";

interface VehicleSpec {
  range?: string;
  topSpeed?: string;
  battery?: string;
  chargingTime?: string;
  motorPower?: string;
  weight?: string;
  warranty?: string;
}

interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: string;
  price: number;
  priceText: string;
  rating: number;
  image: string;
  slug: string;
  specs: VehicleSpec;
}

interface BikeJsonData {
  bikes?: Vehicle[];
  scooters?: Vehicle[];
}

const DEFAULT_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
];

export default function BookTestRide() {
  const [isMounted, setIsMounted] = useState(false);

  const brandOptions = useMemo(() => {
    const rawData = bikeData as BikeJsonData;
    const allVehicles = [
      ...(rawData.bikes || []),
      ...(rawData.scooters || []),
    ];

    const brandMap: Record<string, Set<string>> = {};

    allVehicles.forEach((vehicle) => {
      const brandName = vehicle.brand.trim();

      if (!brandMap[brandName]) {
        brandMap[brandName] = new Set();
      }

      brandMap[brandName].add(vehicle.name);
    });

    return Object.keys(brandMap).map((brand) => ({
      brand,
      models: Array.from(brandMap[brand]),
      cities: DEFAULT_CITIES,
    }));
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    brand: "",
    model: "",
    city: "",
    date: "2026-09-07",
    time: "11:00 AM - 12:00 PM",
  });

  useEffect(() => {
    setIsMounted(true);

    if (brandOptions.length > 0) {
      setFormData((prev) => ({
        ...prev,
        brand: brandOptions[0]?.brand || "",
        model: brandOptions[0]?.models?.[0] || "",
        city: brandOptions[0]?.cities?.[0] || "",
      }));
    }
  }, [brandOptions]);

  const selectedBrandObj = brandOptions.find(
    (item) => item.brand === formData.brand
  );

  const availableModels = selectedBrandObj?.models || [];
  const availableCities = selectedBrandObj?.cities || DEFAULT_CITIES;

  const handleBrandChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newBrand = e.target.value;
    const matched = brandOptions.find(
      (item) => item.brand === newBrand
    );

    setFormData({
      ...formData,
      brand: newBrand,
      model: matched?.models?.[0] || "",
      city: matched?.cities?.[0] || "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted Data:", formData);
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-[#0b0f19]" />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0b0f19] px-4 py-8 font-sans text-white sm:px-6 md:px-12 md:py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 bg-cover bg-center"
      />


      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-3xl rounded-2xl border border-slate-700/80  p-6 shadow-2xl  sm:p-8 md:p-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-7 text-center"
          >
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#70b815]">
              Book a Test Ride
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Experience the future, before you buy.
            </p>
          </motion.div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full rounded-xl border border-slate-700/80 bg-[#0d111d] px-4 py-3 text-sm text-slate-400 placeholder:text-slate-400 outline-none transition-colors focus:border-lime-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-slate-700/80 bg-[#0d111d] px-4 py-3 text-sm text-slate-400 placeholder:text-slate-400 outline-none transition-colors focus:border-lime-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                Contact Number
              </label>

              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="03XX XXXXXXX"
                required
                className="w-full rounded-xl border border-slate-700/80 bg-[#0d111d] px-4 py-3 text-sm text-slate-400 placeholder:text-slate-400 outline-none transition-colors focus:border-lime-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                Select Brand
              </label>

              <div className="relative">
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleBrandChange}
                  className="w-full appearance-none rounded-xl border border-slate-700/80 bg-[#0d111d] px-4 py-3 text-sm text-slate-400 outline-none transition-colors focus:border-lime-500"
                >
                  {brandOptions.map((item, idx) => (
                    <option key={idx} value={item.brand}>
                      {item.brand}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                Select Bike/Scooter
              </label>

              <div className="relative">
                <select
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-slate-700/80 bg-[#0d111d] px-4 py-3 text-sm text-slate-400 outline-none transition-colors focus:border-lime-500"
                >
                  {availableModels.map((model, idx) => (
                    <option key={idx} value={model}>
                      {model}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                Preferred City
              </label>

              <div className="relative">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-slate-700/80 bg-[#0d111d] px-4 py-3 text-sm text-slate-400 outline-none transition-colors focus:border-lime-500"
                >
                  {availableCities.map((city, idx) => (
                    <option key={idx} value={city}>
                      {city}
                    </option>
                  ))}
                </select>

                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <label className="mb-1.5 block text-xs font-medium text-slate-400">
                Preferred Date
              </label>

              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none rounded-xl border border-slate-700/80 bg-[#0d111d] px-4 py-3 text-sm text-slate-200 outline-none transition-colors focus:border-lime-500 [color-scheme:dark]"
                />

                <CalendarIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="sm:col-span-2"
            >
              <label className="mb-1.5 block text-xs font-medium text-white">
                Preferred Time
              </label>

              <div className="relative">
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-slate-700/80 bg-[#0d111d] px-4 py-3 text-sm text-slate-200 outline-none transition-colors focus:border-lime-500"
                >
                  <option value="11:00 AM - 12:00 PM">
                    11:00 AM - 12:00 PM
                  </option>

                  <option value="12:00 PM - 01:00 PM">
                    12:00 PM - 01:00 PM
                  </option>

                  <option value="04:00 PM - 05:00 PM">
                    04:00 PM - 05:00 PM
                  </option>
                </select>

                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-2 w-full rounded-xl bg-[#70b815] px-4 py-3.5 font-semibold text-black shadow-lg shadow-lime-950/30 transition-all duration-200 hover:bg-[#62a212] active:scale-[0.99] sm:col-span-2"
            >
              Submit Request
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3"
        >
          <motion.div
            whileHover={{ y: -5 }}
            className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-[#111625]/80 p-4 backdrop-blur-md"
          >
            <div className="rounded-full bg-lime-500/10 p-2 text-lime-400">
              <KeyRound className="h-5 w-5" />
            </div>

            <span className="text-sm font-medium text-slate-200">
              Free Test Ride
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ delay: 0.05 }}
            className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-[#111625]/80 p-4 backdrop-blur-md"
          >
            <div className="rounded-full bg-lime-500/10 p-2 text-lime-400">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <span className="text-sm font-medium text-slate-200">
              No Obligation
            </span>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3 rounded-xl border border-slate-800/80 bg-[#111625]/80 p-4 backdrop-blur-md"
          >
            <div className="rounded-full bg-lime-500/10 p-2 text-lime-400">
              <Zap className="h-5 w-5" />
            </div>

            <span className="text-sm font-medium text-slate-200">
              Quick Booking
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

