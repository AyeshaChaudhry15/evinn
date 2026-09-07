"use client";

import Image from "next/image";
import Link from "next/link";
import accessoriesData from "../../accessories-data/accessories.json";

export default function Accessories() {
  return (
    <section className="w-full bg-[#07151d] px-6 py-8 md:px-10">
      
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-4xl font-semibold text-white">
            Accessories
          </h2>

          <p className="mt-1 max-w-[230px] text-md  text-gray-300">
            Enhance your ride with premium accessories
          </p>
        </div>

        
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {accessoriesData.accessories.map((item) => (
          <div
            key={item.id}
            className="group rounded-lg border border-[#1c3039] bg-[#0b1b24] p-3 transition duration-300 hover:border-[#31444c] hover:bg-[#10232d]"
          >
            <div className="flex h-[105px] items-center justify-center">
             <img
  src={item.image}
  alt={item.name}
  className="h-[95px] w-auto object-contain"
/>
            </div>

            <div className="mt-2">
              <h3 className="text-sm font-medium text-white">
                {item.name}
              </h3>

              <p className="mt-0.5 text-xs text-gray-300">
                {item.priceText}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}