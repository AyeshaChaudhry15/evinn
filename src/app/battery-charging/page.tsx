"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BatteryCharging,
  BatteryFull,
  Settings,
  Sun,
  Zap,
  Clock,
  ShieldCheck,
  Plug,
  MapPin,
  Navigation,
  Sparkles,
  Wrench,
  Gauge,
  Thermometer,
  ArrowLeft,
} from "lucide-react";

interface Feature {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabData {
  id: string;
  name: string;
  link: string;
  title: string;
  description: string;
  image: string;
  features: Feature[];
  detailedContent: {
    heading: string;
    subheading: string;
    sections: { title: string; text: string }[];
  };
}

const tabsData: TabData[] = [
  {
    id: "battery-guide",
    name: "Battery Guide",
    link: "/battery-guide",
    title: "Battery Guide",
    description:
      "Learn about battery health, care tips and ways to extend battery life.",
    image: "/battery-guide.png",
    features: [
      { id: "long-battery", label: "Long Battery Life", icon: <BatteryFull /> },
      { id: "fast-charging", label: "Fast Charging", icon: <BatteryCharging /> },
      { id: "smart-bms", label: "Smart BMS", icon: <Settings /> },
      { id: "safe-reliable", label: "Safe & Reliable", icon: <Sun /> },
    ],
    detailedContent: {
      heading: "Complete EV Battery Care & Health Guide",
      subheading: "Maximize your vehicle's lifespan with proper battery maintenance techniques.",
      sections: [
        {
          title: "Ideal State of Charge (SoC)",
          text: "Try to keep your battery level between 20% and 80% for daily commuting. Avoid letting it drop to 0% frequently.",
        },
        {
          title: "Temperature Management",
          text: "Avoid charging your electric bike or scooter in direct sunlight during hot summer days. Let the battery cool down for 15-20 minutes after a long ride before plugging it in.",
        },
        {
          title: "Storage Precautions",
          text: "If storing your vehicle for more than two weeks, keep the battery charged to around 50-60% and store it in a cool, dry environment.",
        },
      ],
    },
  },
  {
    id: "charging-guide",
    name: "Charging Guide",
    link: "/charging-guide",
    title: "Charging Guide",
    description:
      "Discover best charging practices, safety protocols, and how to maximize charging efficiency.",
    image: "/charging-guide.png",
    features: [
      { id: "optimal-charging", label: "Optimal Charging", icon: <Zap /> },
      { id: "quick-charge", label: "Quick Charge Support", icon: <Clock /> },
      { id: "overcharge-protection", label: "Overcharge Protection", icon: <ShieldCheck /> },
      { id: "plug-safety", label: "Safe Plug-in Tips", icon: <Plug /> },
    ],
    detailedContent: {
      heading: "Electric Vehicle Charging Protocols & Best Practices",
      subheading: "Safe and efficient ways to power up your EV without degrading the battery.",
      sections: [
        {
          title: "Use OEM Chargers Only",
          text: "Always use the original charger provided by the manufacturer. Unapproved chargers can cause voltage spikes and damage internal BMS circuits.",
        },
        {
          title: "Sequence Matters",
          text: "First connect the charger plug to your vehicle's port, then switch on the wall socket power to avoid initial sparking.",
        },
        {
          title: "Avoid Night Overcharging",
          text: "While modern BMS units have auto cut-off, it is recommended not to leave the charger plugged in overnight unattended.",
        },
      ],
    },
  },
  {
    id: "charging-stations",
    name: "Charging Stations",
    link: "/charging-stations",
    title: "Charging Stations",
    description:
      "Locate fast EV charging stations near you and plan your routes seamlessly.",
    image: "/charging-station.png",
    features: [
      { id: "nearby-locators", label: "Nearby Locators", icon: <MapPin /> },
      { id: "route-planner", label: "Route Planner", icon: <Navigation /> },
      { id: "fast-dc-hubs", label: "Fast DC Hubs", icon: <Zap /> },
      { id: "24-7-availability", label: "24/7 Availability", icon: <Sparkles /> },
    ],
    detailedContent: {
      heading: "Public Charging Network & Fast Station Guide",
      subheading: "Find, connect, and charge your vehicle on the go effortlessly.",
      sections: [
        {
          title: "AC vs DC Fast Charging",
          text: "AC chargers are great for destination charging (workplaces, malls), while DC Fast Chargers give you 80% charge in under 45 minutes on highways.",
        },
        {
          title: "Station Etiquette",
          text: "Move your vehicle promptly once charging reaches 80-90% to allow other waiting EV riders to use the charger.",
        },
        {
          title: "Payment & Mobile Apps",
          text: "Use RFID cards or dedicated mobile apps to locate live available slots and make cashless automatic payments.",
        },
      ],
    },
  },
  {
    id: "maintenance-tips",
    name: "Maintenance Tips",
    link: "/maintenance-tips",
    title: "Maintenance Tips",
    description:
      "Essential maintenance steps to keep your EV running smoothly and safely.",
    image: "/maintainance.png",
    features: [
      { id: "regular-checkups", label: "Regular Checkups", icon: <Wrench /> },
      { id: "tyre-pressure", label: "Tyre Pressure", icon: <Gauge /> },
      { id: "brake-care", label: "Brake & Motor Care", icon: <ShieldCheck /> },
      { id: "weather-protection", label: "Weather Protection", icon: <Thermometer /> },
    ],
    detailedContent: {
      heading: "Comprehensive EV Preventive Maintenance Guide",
      subheading: "Keep your brakes, tires, motor, and electronics in top condition.",
      sections: [
        {
          title: "Tyre Pressure Check",
          text: "Correct tyre pressure improves overall vehicle range by 10-15%. Check tyre pressure weekly before long rides.",
        },
        {
          title: "Brake Maintenance",
          text: "Electric two-wheelers rely heavily on Regenerative Braking. Ensure brake pads are inspected every 3,000 km to prevent rotor wear.",
        },
        {
          title: "Water & Rain Safety",
          text: "While motors and controllers are IP67 water-resistant, avoid riding through deep water bodies where battery connectors might get submerged.",
        },
      ],
    },
  },
];

export default function BatteryChargingPage() {
  const [activeTab, setActiveTab] = useState<string>("battery-guide");
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const currentTab = tabsData.find((tab) => tab.id === activeTab) || tabsData[0];

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setShowDetail(false); 
  };

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

        {showDetail ? (
          <div className="rounded-xl border border-[#263541] bg-[#0b151e] p-6 sm:p-10">
            <button
              onClick={() => setShowDetail(false)}
              className="mb-6 flex items-center gap-2 rounded-md bg-[#101b24] px-4 py-2 text-sm text-[#9bdc16] border border-[#263541] hover:bg-[#182836] transition"
            >
              <ArrowLeft size={18} /> Back to Overview
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-[#f4f7f5] mb-2">
              {currentTab.detailedContent.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#aeb8c2] mb-8">
              {currentTab.detailedContent.subheading}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentTab.detailedContent.sections.map((sec, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-[#263541] bg-[#101b24] p-5"
                >
                  <h3 className="text-lg font-semibold text-[#9bdc16] mb-2">
                    {sec.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#c1cbd3] leading-relaxed">
                    {sec.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[290px_1fr]">
              <div className="overflow-hidden rounded-xl border border-[#263541] bg-[#0b151e]">
                {tabsData.map((item) => {
                  const isActive = item.id === activeTab;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id)}
                      className={`flex h-[58px] w-full items-center border-b border-[#263541] px-6 text-left text-[14px] transition sm:text-[16px] ${
                        isActive
                          ? "border-l-[3px] border-l-[#9bdc16] bg-[#101b24] font-medium text-[#9bdc16]"
                          : "text-[#d3d9de] hover:bg-[#101b24] hover:text-[#9bdc16]"
                      }`}
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>

              <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-[#263541] bg-[#0b151e]">
                <div className="relative z-10 max-w-[520px] px-6 py-7 sm:px-8 sm:py-8">
                  <h2 className="text-[24px] font-semibold sm:text-[30px]">
                    {currentTab.title}
                  </h2>

                  <p className="mt-3 max-w-[470px] text-[13px] leading-6 text-[#aeb8c2] sm:text-[16px] sm:leading-7">
                    {currentTab.description}
                  </p>

                  <button
                    onClick={() => setShowDetail(true)}
                    className="mt-5 inline-block rounded-md bg-[#82c900] px-7 py-3 text-[13px] font-medium text-white transition hover:bg-[#72b500] sm:px-9 sm:text-[14px]"
                  >
                    Learn More
                  </button>
                </div>

                <div className="absolute right-[-20px] top-1/2 hidden h-[230px] w-[430px] -translate-y-1/2 sm:block">
                  <img
                    src={currentTab.image}
                    alt={currentTab.title}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {currentTab.features.map((feature) => (
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
          </>
        )}

      </div>
    </main>
  );
}