"use client";

import Link from "next/link";
import {
  BatteryCharging,
  BatteryFull,
  Settings,
  Sun,
} from "lucide-react";

const menuItems = [
  {
    name: "Battery Guide",
    link: "/battery-guide",
  },
  {
    name: "Charging Guide",
    link: "/charging-guide",
  },
  {
    name: "Charging Stations",
    link: "/charging-stations",
  },
  {
    name: "Maintenance Tips",
    link: "/maintenance-tips",
  },
];

const features = [
  {
    id: "long-battery",
    label: "Long Battery Life",
    icon: <BatteryFull />,
  },
  {
    id: "fast-charging",
    label: "Fast Charging",
    icon: <BatteryCharging />,
  },
  {
    id: "smart-bms",
    label: "Smart BMS",
    icon: <Settings />,
  },
  {
    id: "safe-reliable",
    label: "Safe & Reliable",
    icon: <Sun />,
  },
];

export default function BatteryChargingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#071019] text-[#f4f7f5]">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-8 sm:py-8 lg:px-10">

        <div className="mb-6">
          <h1 className="text-[30px] font-semibold leading-tight sm:text-[42px]">
            Battery & Charging
          </h1>

          <p className="mt-2 text-[13px] text-[#aeb8c2] sm:text-[17px]">
            Power your ride for the smart way.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[290px_1fr]">

          <div className="overflow-hidden rounded-xl border border-[#263541] bg-[#0b151e]">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.link}
                className={`flex h-[58px] items-center border-b border-[#263541] px-6 text-[14px] transition sm:text-[16px] ${
                  index === 0
                    ? "border-l-[3px] border-l-[#9bdc16] bg-[#101b24] font-medium text-[#9bdc16]"
                    : "text-[#d3d9de] hover:bg-[#101b24] hover:text-[#9bdc16]"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-[#263541] bg-[#0b151e]">

            <div className="relative z-10 max-w-[520px] px-6 py-7 sm:px-8 sm:py-8">
              <h2 className="text-[24px] font-semibold sm:text-[30px]">
                Battery Guide
              </h2>

              <p className="mt-3 max-w-[470px] text-[13px] leading-6 text-[#aeb8c2] sm:text-[16px] sm:leading-7">
                Learn about battery health, care tips and ways to extend
                battery life.
              </p>

              <Link
                href="/battery-guide"
                className="mt-5 inline-block rounded-md bg-[#82c900] px-7 py-3 text-[13px] font-medium text-white transition hover:bg-[#72b500] sm:px-9 sm:text-[14px]"
              >
                Learn More
              </Link>
            </div>

            <div className="absolute right-[-20px] top-1/2 hidden h-[230px] w-[430px] -translate-y-1/2 sm:block">
              <img
                src="/battery-guide.png"
                alt="Battery Guide"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex min-h-[110px] flex-col items-center justify-center rounded-xl border border-[#263541] bg-[#0b151e] px-3 py-5 text-center transition hover:border-[#9bdc16]/60"
            >
              <div className="mb-3 text-[#9bdc16] [&>svg]:h-7 [&>svg]:w-7 sm:[&>svg]:h-8 sm:[&>svg]:w-8">
                {feature.icon}
              </div>

              <span className="text-[11px] font-medium text-[#d8dee3] sm:text-[15px]">
                {feature.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}