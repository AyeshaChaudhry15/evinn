"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Navigation,
  ShieldCheck,
  Award,
  Headphones,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Dealer {
  id: string;
  name: string;
  location: string;
  distance: string;
}

const dealersData: Dealer[] = [
  {
    id: "1",
    name: "EVINN Premium Store",
    location: "Lahore, Punjab",
    distance: "2.4 km",
  },
  {
    id: "2",
    name: "Okla Electric Experience Center",
    location: "Islamabad",
    distance: "5.1 km",
  },
  {
    id: "3",
    name: "Revoo store",
    location: "Karachi",
    distance: "8.7 km",
  },
];

export default function FindDealer() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDealers = dealersData.filter(
    (dealer) =>
      dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-[#070b12] p-6 font-sans text-white md:p-12">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-2 text-3xl font-bold tracking-tight md:text-4xl"
          >
            Find A Dealer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm text-slate-400 md:text-base"
          >
            Locate EVINN dealers and service centers near you.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-8 flex max-w-2xl gap-3"
        >
          <div className="relative flex-1">
            <motion.input
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              type="text"
              placeholder="Enter your city or area"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800/80 bg-[#0d1322] px-4 py-3.5 text-sm text-slate-200 placeholder-slate-500 transition-colors focus:border-lime-500 focus:outline-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl bg-[#70b815] px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#61a112]"
          >
            Search
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredDealers.length > 0 ? (
                filteredDealers.map((dealer, index) => (
                  <motion.div
                    key={dealer.id}
                    layout
                    initial={{ opacity: 0, x: -35 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -35, scale: 0.95 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.1,
                    }}
                    whileHover={{ x: 5 }}
                    className="rounded-2xl border border-slate-800/80 bg-[#0b101d] p-5 transition-all hover:border-slate-700"
                  >
                    <motion.h3
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.15 }}
                      className="mb-1 text-base font-bold text-slate-100"
                    >
                      {dealer.name}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="mb-1 text-xs text-slate-400"
                    >
                      {dealer.location}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.25 }}
                      className="mb-4 flex items-center gap-1 text-xs font-medium text-lime-400"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{dealer.distance}</span>
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-700/50 bg-[#131b2e] px-4 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:bg-[#1a253e]"
                    >
                      <Navigation className="h-3.5 w-3.5 text-lime-400" />
                      <span>Get Directions</span>
                    </motion.button>
                  </motion.div>
                ))
              ) : (
                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-sm text-slate-500"
                >
                  No dealers found.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#101726] lg:h-[420px]"
          >
            <iframe
              title="Dealer Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217759.99380839958!2d74.19430635174549!3d31.48310366035043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23add615333709f!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen={false}
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-4 border-t border-slate-800/60 pt-6 md:grid-cols-3"
      >
        {[
          {
            icon: Award,
            title: "Authorized Dealers",
          },
          {
            icon: ShieldCheck,
            title: "Genuine Products",
          },
          {
            icon: Headphones,
            title: "Expert Guidance",
          },
        ].map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.12,
              }}
              whileHover={{ y: -5 }}
              className="flex items-center gap-3 rounded-xl border border-slate-800/60 bg-[#0b101d] p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.15 + index * 0.12,
                }}
                className="rounded-lg bg-lime-500/10 p-2 text-lime-400"
              >
                <Icon className="h-5 w-5" />
              </motion.div>

              <span className="text-xs font-medium text-slate-300 md:text-sm">
                {item.title}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}