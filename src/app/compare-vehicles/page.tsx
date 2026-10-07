"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { request } from "@/lib/api";

interface VehicleSpec {
  range?: string;
  topSpeed?: string;
  battery?: string;
  chargingTime?: string;
  motorPower?: string;
  weight?: string;
  warranty?: string;
  features?: string[];
}

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
  specs?: VehicleSpec;
}

interface VehiclesResponse {
  bikes?: Vehicle[];
}

const comparisonSpecs = [
  {
    key: "range",
    label: "Range",
  },
  {
    key: "topSpeed",
    label: "Top Speed",
  },
  {
    key: "battery",
    label: "Battery",
  },
  {
    key: "chargingTime",
    label: "Charging Time",
  },
  {
    key: "motorPower",
    label: "Motor Power",
  },
  {
    key: "weight",
    label: "Weight",
  },
  {
    key: "warranty",
    label: "Warranty",
  },
] as const;

export default function CompareVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicles, setSelectedVehicles] = useState<
    Vehicle[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [openDropdown, setOpenDropdown] = useState<
    number | null
  >(null);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const response = await request<VehiclesResponse>(
          "/bikes",
          {
            query: {
              page: 1,
              limit: 100,
            },
          }
        );

        const data = response?.bikes ?? [];

        setVehicles(data);
        setSelectedVehicles(data.slice(0, 3));
      } catch (error) {
        console.error(
          "Failed to load comparison vehicles:",
          error
        );

        setVehicles([]);
        setSelectedVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const changeVehicle = (
    index: number,
    vehicle: Vehicle
  ) => {
    const updated = [...selectedVehicles];
    updated[index] = vehicle;

    setSelectedVehicles(updated);
    setOpenDropdown(null);
    setSearch("");
  };

  const addVehicle = () => {
    if (selectedVehicles.length >= 3) {
      return;
    }

    const newVehicle = vehicles.find(
      (vehicle) =>
        !selectedVehicles.some(
          (selected) =>
            selected._id === vehicle._id
        )
    );

    if (newVehicle) {
      setSelectedVehicles([
        ...selectedVehicles,
        newVehicle,
      ]);
    }
  };

  const removeVehicle = (id: string) => {
    setSelectedVehicles(
      selectedVehicles.filter(
        (vehicle) => vehicle._id !== id
      )
    );
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <section className="flex min-h-[500px] items-center justify-center bg-[#07151D] px-4 py-10">
        <p className="text-sm text-gray-400">
          Loading vehicles...
        </p>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#07151D] px-4 py-10 text-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold sm:text-4xl">
            Compare Vehicles
          </h1>

          <p className="mt-3 text-sm text-gray-400">
            Compare electric bikes and scooters side by side.
          </p>
        </motion.div>

        {selectedVehicles.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-[#263640] bg-[#0A151E]">
            <div className="text-center">
              <h2 className="text-lg font-semibold">
                No vehicles available
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Products added by the client will appear here.
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <div
                className="grid min-w-[700px] gap-3"
                style={{
                  gridTemplateColumns: `180px repeat(${selectedVehicles.length}, minmax(190px, 1fr))`,
                }}
              >
                <div>
                  <div className="flex h-[220px] items-center justify-center rounded-lg border border-[#263640] bg-[#0A151E]">
                    <h2 className="text-lg font-semibold text-[#B9ED42]">
                      Features
                    </h2>
                  </div>

                  {comparisonSpecs.map((spec) => (
                    <div
                      key={spec.key}
                      className="mt-3 flex h-12 items-center rounded-lg border border-[#263640] bg-[#0A151E] px-4 text-sm font-medium text-gray-300"
                    >
                      {spec.label}
                    </div>
                  ))}
                </div>

                {selectedVehicles.map(
                  (vehicle, index) => {
                    const isOpen =
                      openDropdown === index;

                    return (
                      <motion.div
                        key={`${vehicle._id}-${index}`}
                        initial={{
                          opacity: 0,
                          y: 25,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1,
                        }}
                      >
                        <div className="relative flex h-[220px] flex-col items-center justify-between rounded-lg border border-[#263640] bg-[#0A151E] p-4">
                          {selectedVehicles.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                removeVehicle(
                                  vehicle._id
                                )
                              }
                              className="absolute right-3 top-2 text-xs text-gray-500 hover:text-red-400"
                            >
                              ✕
                            </button>
                          )}

                          <div className="relative w-full">
                            <button
                              type="button"
                              onClick={() => {
                                setOpenDropdown(
                                  isOpen
                                    ? null
                                    : index
                                );
                                setSearch("");
                              }}
                              className="w-full truncate rounded-md border border-[#263640] bg-[#07151D] px-3 py-2 text-xs font-semibold text-white"
                            >
                              {vehicle.name}{" "}
                              <span className="text-gray-500">
                                ({vehicle.type})
                              </span>{" "}
                              ▾
                            </button>

                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{
                                    opacity: 0,
                                    y: -8,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    y: -8,
                                  }}
                                  className="absolute left-0 right-0 top-full z-50 mt-1 max-h-52 overflow-y-auto rounded-lg border border-[#263640] bg-[#07151D] p-2 shadow-xl"
                                >
                                  <input
                                    value={search}
                                    onChange={(e) =>
                                      setSearch(
                                        e.target.value
                                      )
                                    }
                                    placeholder="Search vehicle..."
                                    className="mb-2 w-full rounded-md border border-[#263640] bg-[#0A151E] px-3 py-2 text-xs text-white outline-none"
                                  />

                                  {filteredVehicles.length >
                                  0 ? (
                                    filteredVehicles.map(
                                      (item) => (
                                        <button
                                          type="button"
                                          key={item._id}
                                          onClick={() =>
                                            changeVehicle(
                                              index,
                                              item
                                            )
                                          }
                                          className="block w-full rounded-md px-3 py-2 text-left text-xs text-gray-300 hover:bg-[#B9ED42] hover:text-[#07151D]"
                                        >
                                          {item.name}{" "}
                                          <span>
                                            ({item.type})
                                          </span>
                                        </button>
                                      )
                                    )
                                  ) : (
                                    <p className="px-3 py-2 text-xs text-gray-500">
                                      No vehicle found
                                    </p>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className="h-24 w-full">
                            <img
                              src={vehicle.imageUrl}
                              alt={vehicle.name}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <p className="text-sm font-bold text-[#B9ED42]">
                            PKR{" "}
                            {Number(
                              vehicle.price
                            ).toLocaleString("en-PK")}
                          </p>
                        </div>

                        {comparisonSpecs.map(
                          (spec) => (
                            <div
                              key={spec.key}
                              className="mt-3 flex h-12 items-center justify-center rounded-lg border border-[#263640] bg-[#0A151E] px-3 text-center text-xs text-gray-300"
                            >
                              {vehicle.specs?.[
                                spec.key
                              ] || "N/A"}
                            </div>
                          )
                        )}
                      </motion.div>
                    );
                  }
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {selectedVehicles.length < 3 && (
                <button
                  type="button"
                  onClick={addVehicle}
                  className="rounded-lg border border-[#263640] bg-[#0A151E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#10212B]"
                >
                  Add Another
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  alert("Full comparison view")
                }
                className="rounded-lg bg-[#B9ED42] px-6 py-3 text-sm font-semibold text-[#07151D] transition hover:bg-[#A5D936]"
              >
                View Full Comparison
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}