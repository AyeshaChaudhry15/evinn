"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, BatteryCharging, Settings, Check } from "lucide-react";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="px-4 sm:px-6 md:px-10 max-w-8xl mx-auto"
      >
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
        >
          Warranty Information
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-400 mt-2 mb-8 sm:mb-10 text-base sm:text-lg"
        >
          Ride with confidence. We&apos;ve got you covered.
        </motion.p>
      </motion.div>

      <div className="w-full px-4 sm:px-6 md:px-10 max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
        {warrantyCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl border border-white/10 bg-[#12181f] px-6 py-8 sm:py-10 flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + i * 0.12,
                }}
              >
                <Icon
                  className="w-12 h-12 sm:w-14 sm:h-14 text-lime-400 mb-4"
                  strokeWidth={1.5}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.12,
                }}
                className="font-semibold text-white text-lg sm:text-xl"
              >
                {card.title}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.4 + i * 0.12,
                }}
                className="text-gray-400 text-base sm:text-lg mt-1"
              >
                {card.subtitle}
              </motion.p>
            </motion.div>
          );
        })}
      </div>

      <div className="w-full px-4 sm:px-6 md:px-10 max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl border border-white/10 bg-[#12181f] overflow-hidden w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full h-48 sm:hidden"
          >
            <Image
              src="/hero1.png"
              alt="Electric scooter"
              fill
              className="object-contain object-center"
            />
          </motion.div>

          <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 md:max-w-xl">
            <motion.h3
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl sm:text-3xl font-bold mb-6"
            >
              What&apos;s Covered?
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
              {coveredItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-2.5"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: 0.1 + i * 0.08,
                    }}
                  >
                    <Check
                      className="w-5 h-5 sm:w-6 sm:h-6 text-lime-400 shrink-0"
                      strokeWidth={3}
                    />
                  </motion.div>

                  <span className="text-gray-200 text-base sm:text-lg">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block w-full sm:w-auto"
            >
              <Link href={"/check-warranty"}>
                <button className="w-full sm:w-auto rounded-full border border-lime-400/60 text-lime-300 px-6 py-2.5 text-base sm:text-lg font-medium hover:bg-lime-400/10 transition-colors">
                  Check Warranty for Your Model
                </button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden sm:block absolute right-0 bottom-0 w-56 md:w-80 lg:w-[28rem] h-[80%] md:h-[90%]"
          >
            <Image
              src="/hero1.png"
              alt="Electric scooter"
              fill
              className="object-contain object-center"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}