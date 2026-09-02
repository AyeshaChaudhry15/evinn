"use client";

import Link from "next/link";

interface Stat {
  value: string;
  label: string;
}

interface Model {
  id: string;
  name: string;
  price: string;
  imgSrc: string;
  link: string;
}

interface Feature {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  { value: "10+", label: "Models" },
  { value: "2.5M+", label: "Happy Customers" },
  { value: "1000+", label: "Service Centers" },
];

const models: Model[] = [
  {
    id: "s1-pro",
    name: "OKla S1 Pro",
    price: "PKR 849,000",
    imgSrc: "/hero3.png",
    link: "/modelDetail",
  },
  {
    id: "s1-air",
    name: "OKla S1 Air",
    price: "PKR 649,000",
    imgSrc: "/hero3.png",
    link: "/modelDetail",
  },
  {
    id: "s1-x",
    name: "OKla S1 X",
    price: "PKR 549,000",
    imgSrc: "/hero3.png",
    link: "/modelDetail",
  },
];

const features: Feature[] = [
  {
    id: "advanced-tech",
    label: "Advanced Technology",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </>
    ),
  },
  {
    id: "long-range",
    label: "Long Range",
    icon: (
      <>
        <rect x="3" y="9" width="15" height="8" rx="1.5" />
        <path d="M18 12h2.5l1.5 2v3h-4" />
        <circle cx="7.5" cy="19" r="1.5" />
        <circle cx="17.5" cy="19" r="1.5" />
      </>
    ),
  },
  {
    id: "fast-charging",
    label: "Fast Charging",
    icon: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  },
  {
    id: "smart-connectivity",
    label: "Smart Connectivity",
    icon: (
      <>
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="6" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M7.7 10.9L16.3 7.1M7.7 13.1L16.3 16.9" />
      </>
    ),
  },
];

export default function Okla() {
  return (
    <div className="min-h-screen w-full bg-[#0b0f14] font-sans text-[#f4f7f5]">
      <div className="mx-auto w-full max-w-[1200px] px-3 py-6 sm:px-10 sm:py-10 lg:px-16">
        <section className="relative flex min-h-[70vh] flex-col justify-center">
          <div className="max-w-[420px]">
            <h1 className="text-[38px] font-bold leading-tight tracking-tight sm:text-[56px]">
              Okla Electric
            </h1>

            <p className="mt-3 text-[14px] leading-relaxed text-[#8b98a3] sm:mt-4 sm:text-[18px]">
              Building a better future with smart electric mobility.
            </p>
          </div>

          <div className="mt-8 flex gap-4 sm:mt-10 sm:gap-20">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-[20px] font-bold text-[#b6ff3c] sm:text-[32px]">
                  {stat.value}
                </div>

                <div className="mt-1 text-[9px] text-[#8b98a3] sm:text-[14px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <img
            src="/hero1.png"
            alt="Okla Electric Hero"
            className="ml-auto mt-8 h-auto w-full max-w-[600px] object-contain sm:absolute sm:right-0 sm:top-1/2 sm:mt-0 sm:w-[55%] sm:-translate-y-1/2"
          />
        </section>

        <section className="mt-10 sm:mt-16">
          <div className="mb-5 flex items-baseline justify-between">
            <h2 className="text-[18px] font-semibold sm:text-[26px]">
              Popular Models
            </h2>

            <a
              href="#"
              className="whitespace-nowrap text-[10px] font-semibold text-[#b6ff3c] sm:text-[14px]"
            >
              View All Models →
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-5">
            {models.map((model) => (
              <Link
                key={model.id}
                href={model.link}
                className="block rounded-lg border border-[#212c37] bg-[#131a22] p-2 transition hover:border-[#b6ff3c]/50 sm:rounded-xl sm:p-5"
              >
                <img
                  src={model.imgSrc}
                  alt={model.name}
                  className="h-[90px] w-full object-contain sm:h-[200px]"
                />

                <div className="mt-2 text-[10px] font-semibold sm:mt-4 sm:text-[20px]">
                  {model.name}
                </div>

                <div className="mt-1 text-[8px] text-[#8b98a3] sm:text-[13px]">
                  {model.price}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 grid grid-cols-2 gap-2 sm:mt-12 sm:grid-cols-4 sm:gap-5">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="rounded-lg border border-[#212c37] bg-[#131a22] px-2 py-4 text-center sm:rounded-xl sm:px-3 sm:py-6"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="mx-auto mb-2 h-6 w-6 text-[#b6ff3c] sm:mb-3 sm:h-8 sm:w-8"
              >
                {feature.icon}
              </svg>

              <div className="text-[9px] leading-snug text-[#8b98a3] sm:text-[15px]">
                {feature.label}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}