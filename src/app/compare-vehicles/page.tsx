"use client";

import { useState } from "react";
import vehiclesData from "../../bike-details/bikes-scooter.json";
import { motion, AnimatePresence } from "framer-motion";

interface Vehicle {
  id: string | number;
  name: string;
  brand: string;
  type: string;
  price: number;
  priceText: string;
  rating: number;
  image: string;
  slug: string;
  specs: {
    range: string;
    topSpeed: string;
    battery: string;
    chargingTime: string;
    motorPower: string;
    weight: string;
    warranty: string;
  };
}

const specsList = [
  { key: "range", label: "Range" },
  { key: "topSpeed", label: "Top Speed" },
  { key: "battery", label: "Battery" },
  { key: "chargingTime", label: "Charging Time" },
  { key: "motorPower", label: "Motor Power" },
  { key: "weight", label: "Weight" },
  { key: "warranty", label: "Warranty" },
] as const;

export default function CompareVehicles() {
  const allVehicles: Vehicle[] = [
    ...(vehiclesData?.bikes || []),
    ...(vehiclesData?.scooters || []),
  ];

  const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>(
    allVehicles.slice(0, 3),
  );

  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectChange = (index: number, vehicle: Vehicle) => {
    const updated = [...selectedVehicles];
    updated[index] = vehicle;
    setSelectedVehicles(updated);
    setOpenDropdownIndex(null);
    setSearchQuery("");
  };

  const handleAddVehicle = () => {
    if (selectedVehicles.length >= 3) return;

    const available = allVehicles.find(
      (v) => !selectedVehicles.some((sv) => String(sv.id) === String(v.id)),
    );

    if (available) {
      setSelectedVehicles([...selectedVehicles, available]);
    }
  };

  const handleRemoveVehicle = (id: string | number) => {
    if (selectedVehicles.length <= 1) return;
    setSelectedVehicles(
      selectedVehicles.filter((v) => String(v.id) !== String(id)),
    );
  };

  return (
    <section className="w-full bg-[#07151d] p-6 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mb-6"
      >
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl font-bold text-white md:text-4xl"
        >
          Compare Vehicles
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-1 text-sm text-gray-400"
        >
          Compare up to 3 models side by side.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="overflow-x-auto"
      >
        <div
          className="grid min-w-[600px] gap-3"
          style={{
            gridTemplateColumns: `1fr repeat(${selectedVehicles.length}, 1fr)`,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2 pt-[180px]"
          >
            {specsList.map((spec, i) => (
              <motion.div
                key={spec.key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex h-11 items-center rounded-lg border border-[#1c3039] bg-[#0b1b24] px-4 text-xs font-medium text-white md:text-sm"
              >
                {spec.label}
              </motion.div>
            ))}
          </motion.div>

          {selectedVehicles.map((item, index) => {
            const isOpen = openDropdownIndex === index;
            const filteredVehicles = allVehicles.filter((v) =>
              v.name.toLowerCase().includes(searchQuery.toLowerCase()),
            );

            return (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="relative flex flex-col gap-2"
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="relative flex h-[170px] flex-col items-center justify-between rounded-lg border border-[#1c3039] bg-[#0b1b24] p-3 text-center"
                >
                  {selectedVehicles.length > 1 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleRemoveVehicle(item.id)}
                      className="absolute right-2 top-1 z-10 text-xs text-gray-400 hover:text-red-400"
                      title="Remove"
                    >
                      ✕
                    </motion.button>
                  )}

                  <div className="relative w-full pr-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setOpenDropdownIndex(isOpen ? null : index);
                        setSearchQuery("");
                      }}
                      className="w-full cursor-pointer truncate rounded border border-[#1c3039] bg-[#06111a] px-2 py-1.5 text-center text-xs font-semibold text-white hover:border-[#8fdf0d]"
                    >
                      {item.name} ({item.type}) ▾
                    </motion.div>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-48 overflow-y-auto rounded border border-[#1c3039] bg-[#06111a] p-1 text-left shadow-lg"
                        >
                          <motion.input
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                            className="mb-1 w-full rounded border border-[#1c3039] bg-[#0b1b24] px-2 py-1 text-xs text-white outline-none focus:border-[#8fdf0d]"
                          />

                          {filteredVehicles.length > 0 ? (
                            filteredVehicles.map((v, i) => (
                              <motion.div
                                key={v.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.2,
                                  delay: i * 0.03,
                                }}
                                whileHover={{ x: 3 }}
                                onClick={() => handleSelectChange(index, v)}
                                className="cursor-pointer rounded px-2 py-1.5 text-xs text-white hover:bg-[#8fdf0d] hover:text-[#06111a]"
                              >
                                {v.name} ({v.type})
                              </motion.div>
                            ))
                          ) : (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="px-2 py-1 text-xs text-gray-400"
                            >
                              No match found
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative h-16 w-full"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain"
                    />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 + index * 0.1 }}
                    className="text-xs font-semibold text-[#8fdf0d]"
                  >
                    {item.priceText}
                  </motion.p>
                </motion.div>

                {specsList.map((spec, i) => (
                  <motion.div
                    key={spec.key}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: i * 0.06,
                    }}
                    whileHover={{ y: -2 }}
                    className="flex h-11 items-center justify-center rounded-lg border border-[#1c3039] bg-[#0b1b24] px-2 text-center text-xs text-gray-200 md:text-sm"
                  >
                    {item.specs ? item.specs[spec.key] : "N/A"}
                  </motion.div>
                ))}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-8 flex justify-center gap-4"
      >
        {selectedVehicles.length < 3 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            onClick={handleAddVehicle}
            className="rounded-lg border border-[#1c3039] bg-[#0b1b24] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#10232d]"
          >
            Add Another
          </motion.button>
        )}

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          onClick={() => alert("Full comparison view")}
          className="rounded-lg bg-[#8fdf0d] px-6 py-2.5 text-sm font-semibold text-[#07151d] transition hover:bg-[#a3f722]"
        >
          View Full Comparison
        </motion.button>
      </motion.div>
    </section>
  );
}