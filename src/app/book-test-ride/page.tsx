"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  ChevronDown, 
  Calendar as CalendarIcon, 
  KeyRound, 
  ShieldCheck, 
  Zap 
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
  "Quetta"
];

export default function BookTestRide() {
  const [isMounted, setIsMounted] = useState(false);

  const brandOptions = useMemo(() => {
    const rawData = bikeData as BikeJsonData;
    const allVehicles = [...(rawData.bikes || []), ...(rawData.scooters || [])];

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

  const selectedBrandObj = brandOptions.find((item) => item.brand === formData.brand);
  const availableModels = selectedBrandObj?.models || [];
  const availableCities = selectedBrandObj?.cities || DEFAULT_CITIES;

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBrand = e.target.value;
    const matched = brandOptions.find((item) => item.brand === newBrand);

    setFormData({
      ...formData,
      brand: newBrand,
      model: matched?.models?.[0] || "",
      city: matched?.cities?.[0] || "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted Data:", formData);
  };

  if (!isMounted) {
    return <div className="min-h-screen bg-[#0b0f19]" />;
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0b0f19] text-white flex flex-col justify-between p-6 md:p-12 font-sans overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-cover bg-center z-0 md:opacity-60"
        style={{ backgroundImage: "url('/blog3.avif')" }} 
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/80 to-transparent z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center my-auto">
        
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#111625]/90 backdrop-blur-md border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl font-bold tracking-tight mb-2"
          >
            Book a Test Ride
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-slate-400 text-sm mb-6"
          >
            Experience the future, before you buy.
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.55 }}
            >
              <label className="block text-xs text-slate-400 mb-1 font-medium">
                Select Brand
              </label>
              <div className="relative">
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleBrandChange}
                  className="w-full bg-[#0d111d] border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-200 appearance-none focus:outline-none focus:border-lime-500 transition-colors"
                >
                  {brandOptions.map((item, idx) => (
                    <option key={idx} value={item.brand}>
                      {item.brand}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <label className="block text-xs text-slate-400 mb-1 font-medium">
                Select Model
              </label>
              <div className="relative">
                <select
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="w-full bg-[#0d111d] border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-200 appearance-none focus:outline-none focus:border-lime-500 transition-colors"
                >
                  {availableModels.map((model, idx) => (
                    <option key={idx} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65 }}
            >
              <label className="block text-xs text-slate-400 mb-1 font-medium">
                Preferred City
              </label>
              <div className="relative">
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full bg-[#0d111d] border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-200 appearance-none focus:outline-none focus:border-lime-500 transition-colors"
                >
                  {availableCities.map((city, idx) => (
                    <option key={idx} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <label className="block text-xs text-slate-400 mb-1 font-medium">
                Preferred Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-[#0d111d] border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-200 appearance-none focus:outline-none focus:border-lime-500 transition-colors [color-scheme:dark]"
                />
                <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.75 }}
            >
              <label className="block text-xs text-slate-400 mb-1 font-medium">
                Preferred Time
              </label>
              <div className="relative">
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full bg-[#0d111d] border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-200 appearance-none focus:outline-none focus:border-lime-500 transition-colors"
                >
                  <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                  <option value="12:00 PM - 01:00 PM">12:00 PM - 01:00 PM</option>
                  <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className="w-full mt-2 bg-[#70b815] hover:bg-[#62a212] text-black font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 active:scale-[0.99] shadow-lg shadow-lime-950/30"
            >
              Submit Request
            </motion.button>
          </form>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative z-10 max-w-7xl mx-auto w-full mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-[#111625]/80 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-full bg-lime-500/10 text-lime-400">
            <KeyRound className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-slate-200">Free Test Ride</span>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          transition={{ delay: 0.05 }}
          className="bg-[#111625]/80 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-full bg-lime-500/10 text-lime-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-slate-200">No Obligation</span>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          transition={{ delay: 0.1 }}
          className="bg-[#111625]/80 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 flex items-center gap-3"
        >
          <div className="p-2 rounded-full bg-lime-500/10 text-lime-400">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-sm font-medium text-slate-200">Quick Booking</span>
        </motion.div>
      </motion.div>
    </div>
  );
}