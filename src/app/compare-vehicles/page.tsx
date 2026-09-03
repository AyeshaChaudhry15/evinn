"use client";

import { useState } from "react";
import vehiclesData from "../../bike-details/bikes-scooter.json";

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

  const handleSelectChange = (index: number, vehicleId: string) => {
    const found = allVehicles.find((v) => String(v.id) === String(vehicleId));
    if (!found) return;

    const updated = [...selectedVehicles];
    updated[index] = found;
    setSelectedVehicles(updated);
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
    <section className="w-full  bg-[#07151d] p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          Compare Vehicles
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Compare up to 3 models side by side.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div
          className="grid min-w-[600px] gap-3"
          style={{
            gridTemplateColumns: `1fr repeat(${selectedVehicles.length}, 1fr)`,
          }}
        >
          <div className="flex flex-col gap-2 pt-[180px]">
            {specsList.map((spec) => (
              <div
                key={spec.key}
                className="flex h-11 items-center rounded-lg border border-[#1c3039] bg-[#0b1b24] px-4 text-xs font-medium text-white md:text-sm"
              >
                {spec.label}
              </div>
            ))}
          </div>

          {selectedVehicles.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative flex flex-col gap-2"
            >
              <div className="relative flex h-[170px] flex-col items-center justify-between rounded-lg border border-[#1c3039] bg-[#0b1b24] p-3 text-center">
                {selectedVehicles.length > 1 && (
                  <button
                    onClick={() => handleRemoveVehicle(item.id)}
                    className="absolute right-2 top-1 z-10 text-xs text-gray-400 hover:text-red-400"
                    title="Remove"
                  >
                    ✕
                  </button>
                )}

                <div className="relative w-full pr-6">
                  <select
                    value={item.id}
                    onChange={(e) => handleSelectChange(index, e.target.value)}
                    className="w-full truncate border-none bg-transparent pr-4 text-center text-xs font-semibold text-white outline-none cursor-pointer"
                  >
                    {allVehicles.map((v) => (
                      <option
                        key={v.id}
                        value={v.id}
                        className="bg-[#0b1b24] text-white"
                      >
                        {v.name} ({v.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative h-16 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                <p className="text-xs font-semibold text-[#8fdf0d]">
                  {item.priceText}
                </p>
              </div>

              {specsList.map((spec) => (
                <div
                  key={spec.key}
                  className="flex h-11 items-center justify-center rounded-lg border border-[#1c3039] bg-[#0b1b24] px-2 text-center text-xs text-gray-200 md:text-sm"
                >
                  {item.specs ? item.specs[spec.key] : "N/A"}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        {selectedVehicles.length < 3 && (
          <button
            onClick={handleAddVehicle}
            className="rounded-lg border border-[#1c3039] bg-[#0b1b24] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#10232d]"
          >
            Add Another
          </button>
        )}

        <button
          onClick={() => alert("Full comparison view")}
          className="rounded-lg bg-[#8fdf0d] px-6 py-2.5 text-sm font-semibold text-[#07151d] transition hover:bg-[#a3f722]"
        >
          View Full Comparison
        </button>
      </div>
    </section>
  );
}
