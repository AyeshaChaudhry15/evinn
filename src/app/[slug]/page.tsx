"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Battery,
  Gauge,
  Zap,
  Clock,
  Weight,
  ShieldCheck,
  Star,
  CheckCircle2,
} from "lucide-react";

import vehiclesData from "../../bike-details/bikes-scooter.json";

interface Vehicle {
  id: string | number;
  name: string;
  brand: string;
  type: string;
  priceText: string;
  price: number;
  rating: number;
  image: string;
  slug: string;

  specs?: {
    range: string;
    topSpeed: string;
    battery: string;
    chargingTime: string;
    motorPower: string;
    weight: string;
    warranty: string;
  };
}

export default function ModelDetailPage() {
  const params = useParams();

  const [activeTab, setActiveTab] = useState<
    "overview" | "features" | "reviews"
  >("overview");

  const slug =
    typeof params.slug === "string" ? params.slug : "";

  const bikeData: Vehicle[] = Array.isArray(vehiclesData)
    ? vehiclesData
    : [
        ...(vehiclesData.bikes || []),
        ...(vehiclesData.scooters || []),
      ];

  const vehicle = bikeData.find(
    (bike) => bike.slug === slug
  );

  if (!vehicle) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#06111A] px-4 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Model Not Found
          </h1>

          <p className="mt-3 text-[#AEB7BC]">
            The model you are looking for does not exist.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-[#8FDF0D] px-6 py-3 text-sm font-bold text-[#06111A]"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#06111A] text-white">
      <section className="border-b border-[#23333D] bg-[#06111A]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#AEB7BC] transition hover:text-[#8FDF0D]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div className="flex min-h-[400px] items-center justify-center overflow-hidden rounded-2xl bg-white p-8 sm:min-h-[500px]">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="h-full max-h-[480px] w-full object-contain transition duration-500 hover:scale-105"
              />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-[2px] text-[#8FDF0D]">
                {vehicle.brand}
              </p>

              <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {vehicle.name}
              </h1>

              <p className="mt-3 text-sm capitalize text-[#8B969C]">
                {vehicle.type}
              </p>

              <div className="mt-5 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-[#8FDF0D] text-[#8FDF0D]" />
                  <span className="font-bold">
                    {vehicle.rating}
                  </span>
                </div>

                <span className="text-sm text-[#8B969C]">
                  Rating
                </span>
              </div>

              <div className="mt-7">
                <p className="text-sm text-[#8B969C]">
                  Starting Price
                </p>

                <p className="mt-1 text-3xl font-extrabold text-[#8FDF0D]">
                  {vehicle.priceText}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button className="flex-1 rounded-xl bg-[#8FDF0D] px-8 py-4 text-center text-sm font-bold text-[#06111A] transition-transform hover:scale-105 active:scale-95">
                  Add to Cart
                </button>
                <button className="flex-1 rounded-xl border border-[#23333D] bg-[#0A151E] px-8 py-4 text-center text-sm font-bold text-[#8FDF0D] transition-colors hover:border-[#8FDF0D] hover:text-[#8FDF0D]">
                  Buy Now
                </button>

              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-4">
                  <Gauge className="h-5 w-5 text-[#8FDF0D]" />
                  <p className="mt-2 text-xs text-[#8B969C]">
                    Top Speed
                  </p>
                  <p className="mt-1 text-sm font-bold">
                    {vehicle.specs?.topSpeed || "—"}
                  </p>
                </div>

                <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-4">
                  <Battery className="h-5 w-5 text-[#8FDF0D]" />
                  <p className="mt-2 text-xs text-[#8B969C]">
                    Battery
                  </p>
                  <p className="mt-1 text-sm font-bold">
                    {vehicle.specs?.battery || "—"}
                  </p>
                </div>

                <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-4">
                  <Zap className="h-5 w-5 text-[#8FDF0D]" />
                  <p className="mt-2 text-xs text-[#8B969C]">
                    Motor
                  </p>
                  <p className="mt-1 text-sm font-bold">
                    {vehicle.specs?.motorPower || "—"}
                  </p>
                </div>

                <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-4">
                  <Gauge className="h-5 w-5 text-[#8FDF0D]" />
                  <p className="mt-2 text-xs text-[#8B969C]">
                    Range
                  </p>
                  <p className="mt-1 text-sm font-bold">
                    {vehicle.specs?.range || "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-10">
        <div className="border-b border-[#23333D]">
          <div className="flex gap-8 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`whitespace-nowrap pb-4 text-sm font-bold transition ${
                activeTab === "overview"
                  ? "border-b-2 border-[#8FDF0D] text-[#8FDF0D]"
                  : "text-[#8B969C] hover:text-white"
              }`}
            >
              Overview
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("features")}
              className={`whitespace-nowrap pb-4 text-sm font-bold transition ${
                activeTab === "features"
                  ? "border-b-2 border-[#8FDF0D] text-[#8FDF0D]"
                  : "text-[#8B969C] hover:text-white"
              }`}
            >
              Features
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`whitespace-nowrap pb-4 text-sm font-bold transition ${
                activeTab === "reviews"
                  ? "border-b-2 border-[#8FDF0D] text-[#8FDF0D]"
                  : "text-[#8B969C] hover:text-white"
              }`}
            >
              Reviews
            </button>
          </div>
        </div>

        <div className="py-10">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold">
                  {vehicle.name} Overview
                </h2>

                <p className="mt-4 max-w-4xl text-sm leading-7 text-[#AEB7BC]">
                  The {vehicle.name} is a {vehicle.type} from{" "}
                  {vehicle.brand}. Explore its performance,
                  specifications and key details below.
                </p>
              </div>

              <div>
                <h2 className="mb-5 text-2xl font-bold">
                  Specifications
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-5">
                    <Gauge className="h-5 w-5 text-[#8FDF0D]" />

                    <p className="mt-4 text-sm text-[#8B969C]">
                      Range
                    </p>

                    <p className="mt-1 font-bold">
                      {vehicle.specs?.range || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-5">
                    <Gauge className="h-5 w-5 text-[#8FDF0D]" />

                    <p className="mt-4 text-sm text-[#8B969C]">
                      Top Speed
                    </p>

                    <p className="mt-1 font-bold">
                      {vehicle.specs?.topSpeed || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-5">
                    <Battery className="h-5 w-5 text-[#8FDF0D]" />

                    <p className="mt-4 text-sm text-[#8B969C]">
                      Battery
                    </p>

                    <p className="mt-1 font-bold">
                      {vehicle.specs?.battery || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-5">
                    <Clock className="h-5 w-5 text-[#8FDF0D]" />

                    <p className="mt-4 text-sm text-[#8B969C]">
                      Charging Time
                    </p>

                    <p className="mt-1 font-bold">
                      {vehicle.specs?.chargingTime || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-5">
                    <Zap className="h-5 w-5 text-[#8FDF0D]" />

                    <p className="mt-4 text-sm text-[#8B969C]">
                      Motor Power
                    </p>

                    <p className="mt-1 font-bold">
                      {vehicle.specs?.motorPower || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-5">
                    <Weight className="h-5 w-5 text-[#8FDF0D]" />

                    <p className="mt-4 text-sm text-[#8B969C]">
                      Weight
                    </p>

                    <p className="mt-1 font-bold">
                      {vehicle.specs?.weight || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-5">
                    <ShieldCheck className="h-5 w-5 text-[#8FDF0D]" />

                    <p className="mt-4 text-sm text-[#8B969C]">
                      Warranty
                    </p>

                    <p className="mt-1 font-bold">
                      {vehicle.specs?.warranty || "—"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-5">
                    <CheckCircle2 className="h-5 w-5 text-[#8FDF0D]" />

                    <p className="mt-4 text-sm text-[#8B969C]">
                      Vehicle Type
                    </p>

                    <p className="mt-1 font-bold capitalize">
                      {vehicle.type}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "features" && (
            <div>
              <h2 className="text-2xl font-bold">
                {vehicle.name} Features
              </h2>

              <p className="mt-3 text-sm text-[#AEB7BC]">
                Explore the key features of the {vehicle.name}.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-6">
                  <CheckCircle2 className="h-6 w-6 text-[#8FDF0D]" />
                  <h3 className="mt-4 font-bold">
                    Electric Performance
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#8B969C]">
                    Efficient electric performance designed for
                    everyday riding.
                  </p>
                </div>

                <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-6">
                  <Battery className="h-6 w-6 text-[#8FDF0D]" />
                  <h3 className="mt-4 font-bold">
                    Powerful Battery
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#8B969C]">
                    Reliable battery performance for comfortable
                    daily commuting.
                  </p>
                </div>

                <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-6">
                  <Zap className="h-6 w-6 text-[#8FDF0D]" />
                  <h3 className="mt-4 font-bold">
                    Fast Acceleration
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#8B969C]">
                    Smooth and responsive acceleration for city
                    riding.
                  </p>
                </div>

                <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-6">
                  <ShieldCheck className="h-6 w-6 text-[#8FDF0D]" />
                  <h3 className="mt-4 font-bold">
                    Safety
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#8B969C]">
                    Designed with everyday rider safety and
                    reliability in mind.
                  </p>
                </div>

                <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-6">
                  <Gauge className="h-6 w-6 text-[#8FDF0D]" />
                  <h3 className="mt-4 font-bold">
                    Smart Performance
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#8B969C]">
                    Balanced performance for practical urban
                    mobility.
                  </p>
                </div>

                <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-6">
                  <Clock className="h-6 w-6 text-[#8FDF0D]" />
                  <h3 className="mt-4 font-bold">
                    Convenient Charging
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#8B969C]">
                    Convenient charging designed for regular
                    everyday use.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h2 className="text-2xl font-bold">
                {vehicle.name} Reviews
              </h2>

              <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-6 text-center">
                  <p className="text-5xl font-extrabold text-[#8FDF0D]">
                    {vehicle.rating}
                  </p>

                  <div className="mt-3 flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-5 w-5 fill-[#8FDF0D] text-[#8FDF0D]"
                      />
                    ))}
                  </div>

                  <p className="mt-3 text-sm text-[#8B969C]">
                    Based on customer ratings
                  </p>
                </div>

                <div className="rounded-xl border border-[#23333D] bg-[#0A151E] p-6 lg:col-span-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-[#8FDF0D] text-[#8FDF0D]"
                      />
                    ))}
                  </div>

                  <h3 className="mt-4 font-bold">
                    Great everyday ride
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
                    The {vehicle.name} offers a practical riding
                    experience with good performance and useful
                    features for everyday commuting.
                  </p>

                  <p className="mt-4 text-xs font-semibold text-[#8B969C]">
                    Verified Customer
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}