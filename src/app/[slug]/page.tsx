"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AddToCartButton from "../../../components/add-to-cart";

import {
  ArrowLeft,
  Battery,
  Gauge,
  Zap,
  Clock,
  Weight,
  ShieldCheck,
  Star,
  CheckCircle2,
} from "lucide-react";

import vehiclesData from "../../bike-details/bikes-scooter.json";

interface Vehicle {
  id: string | number;
  name: string;
  brand: string;
  type: string;
  priceText: string;
  price: number;
  rating: number;
  image: string;
  slug: string;

  specs?: {
    range: string;
    topSpeed: string;
    battery: string;
    chargingTime: string;
    motorPower: string;
    weight: string;
    warranty: string;
  };
}

export default function ModelDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<
    "overview" | "features" | "reviews"
  >("overview");

  const slug = typeof params.slug === "string" ? params.slug : "";

  const bikeData: Vehicle[] = Array.isArray(vehiclesData)
    ? vehiclesData
    : [...(vehiclesData.bikes || []), ...(vehiclesData.scooters || [])];

  const vehicle = bikeData.find((bike) => bike.slug === slug);

  const handleBuyNow = () => {
    const singleOrderProduct = {
      id: vehicle?.id,
      name: vehicle?.name,
      price: vehicle?.price,
      image: vehicle?.image,
      quantity: 1,
    };

    localStorage.setItem(
      "directCheckoutItem",
      JSON.stringify(singleOrderProduct)
    );

    router.push("/shipping");
  };

  if (!vehicle) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06111A] px-4 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold">Model Not Found</h1>

          <p className="mt-3 text-[#AEB7BC]">
            The model you are looking for does not exist.
          </p>

          <div>
            <Link
              href="/"
              className="mt-6 inline-flex rounded-full bg-[#8FDF0D] px-6 py-3 text-sm font-bold text-[#06111A]"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#06111A] text-white">
      <section className="border-b border-[#23333D] bg-[#06111A]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#AEB7BC] transition hover:text-[#8FDF0D]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="flex min-h-[400px] items-center justify-center overflow-hidden rounded-2xl bg-white p-8 sm:min-h-[500px]"
            >
              <motion.img
                src={vehicle.image}
                alt={vehicle.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="h-full max-h-[480px] w-full object-contain transition duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-bold uppercase tracking-[2px] text-[#8FDF0D]"
              >
                {vehicle.brand}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl"
              >
                {vehicle.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-3 text-sm capitalize text-[#8B969C]"
              >
                {vehicle.type}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-5 flex items-center gap-2"
              >
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-[#8FDF0D] text-[#8FDF0D]" />
                  <span className="font-bold">{vehicle.rating}</span>
                </div>

                <span className="text-sm text-[#8B969C]">Rating</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-7"
              >
                <p className="text-sm text-[#8B969C]">Starting Price</p>

                <p className="mt-1 text-3xl font-extrabold text-[#8FDF0D]">
                  {vehicle.priceText}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row">
                  <div className="flex-1">
                    <AddToCartButton
                      product={{
                        id: vehicle.id,
                        name: vehicle.name,
                        price: vehicle.price,
                        image: vehicle.image,
                      }}
                      className="flex-1 rounded-xl bg-[#8FDF0D] px-8 py-4 text-center text-sm font-bold text-[#06111A] transition-transform hover:scale-105 active:scale-95"
                    >
                      Add to Cart
                    </AddToCartButton>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleBuyNow}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-1 cursor-pointer rounded-xl border border-[#23333D] bg-[#0A151E] px-8 py-4 text-center text-sm font-bold text-[#8FDF0D] transition-colors hover:border-[#8FDF0D] hover:text-[#8FDF0D]"
                  >
                    Buy Now
                  </motion.button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {[
                  {
                    icon: Gauge,
                    label: "Top Speed",
                    value: vehicle.specs?.topSpeed || "—",
                  },
                  {
                    icon: Battery,
                    label: "Battery",
                    value: vehicle.specs?.battery || "—",
                  },
                  {
                    icon: Zap,
                    label: "Motor",
                    value: vehicle.specs?.motorPower || "—",
                  },
                  {
                    icon: Gauge,
                    label: "Range",
                    value: vehicle.specs?.range || "—",
                  },
                ].map((item, i) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="rounded-xl border border-[#23333D] bg-[#0A151E] p-4"
                    >
                      <Icon className="h-5 w-5 text-[#8FDF0D]" />

                      <p className="mt-2 text-xs text-[#8B969C]">
                        {item.label}
                      </p>

                      <p className="mt-1 text-sm font-bold">{item.value}</p>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-[#23333D]"
        >
          <div className="flex gap-8 overflow-x-auto">
            {(["overview", "features", "reviews"] as const).map((tab) => (
              <motion.button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`whitespace-nowrap pb-4 text-sm font-bold transition ${
                  activeTab === tab
                    ? "border-b-2 border-[#8FDF0D] text-[#8FDF0D]"
                    : "text-[#8B969C] hover:text-white"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="py-10"
          >
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold">
                    {vehicle.name} Overview
                  </h2>

                  <p className="mt-4 max-w-4xl text-sm leading-7 text-[#AEB7BC]">
                    The {vehicle.name} is a {vehicle.type} from {vehicle.brand}.
                    Explore its performance, specifications and key details
                    below.
                  </p>
                </div>

                <div>
                  <h2 className="mb-5 text-2xl font-bold">Specifications</h2>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      {
                        icon: Gauge,
                        label: "Range",
                        value: vehicle.specs?.range || "—",
                      },
                      {
                        icon: Gauge,
                        label: "Top Speed",
                        value: vehicle.specs?.topSpeed || "—",
                      },
                      {
                        icon: Battery,
                        label: "Battery",
                        value: vehicle.specs?.battery || "—",
                      },
                      {
                        icon: Clock,
                        label: "Charging Time",
                        value: vehicle.specs?.chargingTime || "—",
                      },
                      {
                        icon: Zap,
                        label: "Motor Power",
                        value: vehicle.specs?.motorPower || "—",
                      },
                      {
                        icon: Weight,
                        label: "Weight",
                        value: vehicle.specs?.weight || "—",
                      },
                      {
                        icon: ShieldCheck,
                        label: "Warranty",
                        value: vehicle.specs?.warranty || "—",
                      },
                      {
                        icon: CheckCircle2,
                        label: "Vehicle Type",
                        value: vehicle.type,
                      },
                    ].map((item, i) => {
                      const Icon = item.icon;

                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          whileHover={{ y: -5 }}
                          className="rounded-xl border border-[#23333D] bg-[#0A151E] p-5"
                        >
                          <Icon className="h-5 w-5 text-[#8FDF0D]" />

                          <p className="mt-4 text-sm text-[#8B969C]">
                            {item.label}
                          </p>

                          <p
                            className={`mt-1 font-bold ${
                              item.label === "Vehicle Type" ? "capitalize" : ""
                            }`}
                          >
                            {item.value}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "features" && (
              <div>
                <h2 className="text-2xl font-bold">
                  {vehicle.name} Features
                </h2>

                <p className="mt-3 text-sm text-[#AEB7BC]">
                  Explore the key features of the {vehicle.name}.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      icon: CheckCircle2,
                      title: "Electric Performance",
                      description:
                        "Efficient electric performance designed for everyday riding.",
                    },
                    {
                      icon: Battery,
                      title: "Powerful Battery",
                      description:
                        "Reliable battery performance for comfortable daily commuting.",
                    },
                    {
                      icon: Zap,
                      title: "Fast Acceleration",
                      description:
                        "Smooth and responsive acceleration for city riding.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Safety",
                      description:
                        "Designed with everyday rider safety and reliability in mind.",
                    },
                    {
                      icon: Gauge,
                      title: "Smart Performance",
                      description:
                        "Balanced performance for practical urban mobility.",
                    },
                    {
                      icon: Clock,
                      title: "Convenient Charging",
                      description:
                        "Convenient charging designed for regular everyday use.",
                    },
                  ].map((item, i) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -6 }}
                        className="rounded-xl border border-[#23333D] bg-[#0A151E] p-6"
                      >
                        <Icon className="h-6 w-6 text-[#8FDF0D]" />

                        <h3 className="mt-4 font-bold">{item.title}</h3>

                        <p className="mt-2 text-sm leading-6 text-[#8B969C]">
                          {item.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h2 className="text-2xl font-bold">
                  {vehicle.name} Reviews
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <motion.div
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl border border-[#23333D] bg-[#0A151E] p-6 text-center"
                  >
                    <p className="text-5xl font-extrabold text-[#8FDF0D]">
                      {vehicle.rating}
                    </p>

                    <div className="mt-3 flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.div
                          key={star}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: star * 0.08 }}
                        >
                          <Star className="h-5 w-5 fill-[#8FDF0D] text-[#8FDF0D]" />
                        </motion.div>
                      ))}
                    </div>

                    <p className="mt-3 text-sm text-[#8B969C]">
                      Based on customer ratings
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl border border-[#23333D] bg-[#0A151E] p-6 lg:col-span-2"
                  >
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="h-4 w-4 fill-[#8FDF0D] text-[#8FDF0D]"
                        />
                      ))}
                    </div>

                    <h3 className="mt-4 font-bold">Great everyday ride</h3>

                    <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
                      The {vehicle.name} offers a practical riding experience
                      with good performance and useful features for everyday
                      commuting.
                    </p>

                    <p className="mt-4 text-xs font-semibold text-[#8B969C]">
                      Verified Customer
                    </p>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
}