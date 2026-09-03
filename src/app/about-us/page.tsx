"use client";

import {
  Leaf,
  Lightbulb,
  Sprout,
  Users,
} from "lucide-react";

const stats = [
  {
    value: "10+",
    label: "Trusted Brands",
  },
  {
    value: "500+",
    label: "Models",
  },
  {
    value: "10K+",
    label: "Happy Customers",
  },
];

const values = [
  {
    id: "innovation",
    label: "Innovation",
    icon: <Lightbulb />,
  },
  {
    id: "sustainability",
    label: "Sustainability",
    icon: <Leaf />,
  },
  {
    id: "customer-first",
    label: "Customer First",
    icon: <Users />,
  },
];

export default function AboutPage() {
  return (
<main className="overflow-hidden bg-[#071019] text-[#f4f7f5]">
  <div className="relative mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-8 sm:py-8 lg:px-10">
        <div className="absolute right-[-140px] top-[20px] z-0 h-[700px] w-[600px] opacity-40  sm:right-[-120px] sm:top-[100px] sm:h-[500px] sm:w-[500px] sm:opacity-50 lg:right-[-90px] lg:top-[5px] lg:h-[650px] lg:w-[750px] lg:opacity-90">
          <div className="absolute inset-0 rounded-full bg-[#75d900]/10 blur-[100px]" />

          <img
            src="/about-globe.png"
            alt=""
            className="relative h-full w-full object-contain"
          />
        </div>

        <div className="relative z-10 w-full max-w-[700px]">

          <h1 className="text-[34px] font-semibold leading-tight tracking-tight sm:text-[44px] lg:text-[52px]">
            About EV
          <span className="text-[#8fdf0d]">INN</span>

          </h1>

          <p className="mt-2 text-[14px] text-[#b8c1ca] sm:text-[17px] lg:text-[18px]">
            Driving Pakistan towards a cleaner, greener future.
          </p>

          <p className="mt-6 max-w-[650px] text-[13px] leading-6 text-[#b0bbc5] sm:mt-8 sm:text-[16px] sm:leading-7 lg:mt-9 lg:text-[17px] lg:leading-8">
            EVINN is Pakistan's trusted electric mobility marketplace,
            bringing you the best electric bikes and scooters from top
            global and local brands.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:max-w-[610px] sm:gap-3 lg:mt-10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-h-[82px] flex-col items-center justify-center rounded-xl border border-[#263541] bg-[#0d1720]/90 px-1 py-3 text-center backdrop-blur-sm sm:min-h-[100px] sm:px-2 sm:py-4"
              >
                <span className="text-[21px] font-semibold sm:text-[28px] lg:text-[30px]">
                  {stat.value}
                </span>

                <span className="mt-1 text-[8px] text-[#c0c8d0] sm:text-[12px] lg:text-[13px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex min-h-[115px] items-center gap-3 rounded-xl border border-[#263541] bg-[#0d1720]/90 px-4 py-4 backdrop-blur-sm sm:mt-7 sm:min-h-[135px] sm:gap-5 sm:px-6 sm:py-5 lg:mt-8 lg:min-h-[145px] lg:px-7">
            <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border-2 border-[#9bdc16] sm:h-[64px] sm:w-[64px] lg:h-[70px] lg:w-[70px]">
              <Sprout className="h-6 w-6 text-[#9bdc16] sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
            </div>

            <div>
              <h2 className="text-[15px] font-semibold sm:text-[18px] lg:text-[20px]">
                Our Mission
              </h2>

              <p className="mt-1 text-[11px] leading-5 text-[#b8c1ca] sm:mt-2 sm:text-[14px] sm:leading-6 lg:text-[16px] lg:leading-7">
                To accelerate the world's transition to sustainable mobility.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3 lg:mt-9">
            {values.map((value) => (
              <div
                key={value.id}
                className="flex min-h-[72px] items-center justify-center gap-1 rounded-xl border border-[#263541] bg-[#0d1720]/90 px-1 backdrop-blur-sm sm:min-h-[88px] sm:gap-2 sm:px-2 lg:min-h-[95px] lg:gap-3"
              >
                <div className="shrink-0 text-[#9bdc16] [&>svg]:h-5 [&>svg]:w-5 sm:[&>svg]:h-7 sm:[&>svg]:w-7 lg:[&>svg]:h-8 lg:[&>svg]:w-8">
                  {value.icon}
                </div>

                <span className="text-[12px] font-medium text-[#d7dde2] sm:text-[18px] lg:text-[20px]">
                  {value.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className=" absolute bottom-[-100px] right-[-150px] h-[300px] w-[300px] rounded-full bg-[#65d500]/10 blur-[100px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]" />
      </div>
    </main>
  );
}