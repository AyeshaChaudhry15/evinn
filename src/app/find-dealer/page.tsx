"use client";

import { useState } from "react";
import { 
  Search, 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  Award, 
  Headphones 
} from "lucide-react";

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
      dealer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-[#070b12] text-white p-6 md:p-12 font-sans flex flex-col justify-between">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            Find A Dealer
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Locate EVINN dealers and service centers near you.
          </p>
        </div>

        <div className="flex gap-3 mb-8 max-w-2xl">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Enter your city or area"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1322] border border-slate-800/80 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-lime-500 transition-colors"
            />
          </div>
          <button className="bg-[#70b815] hover:bg-[#61a112] text-black font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm">
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            {filteredDealers.length > 0 ? (
              filteredDealers.map((dealer) => (
                <div
                  key={dealer.id}
                  className="bg-[#0b101d] border border-slate-800/80 p-5 rounded-2xl hover:border-slate-700 transition-all"
                >
                  <h3 className="text-base font-bold text-slate-100 mb-1">
                    {dealer.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-1">{dealer.location}</p>
                  
                  <div className="flex items-center gap-1 text-xs text-lime-400 mb-4 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{dealer.distance}</span>
                  </div>

                  <button className="inline-flex items-center gap-2 bg-[#131b2e] hover:bg-[#1a253e] text-slate-300 text-xs font-medium px-4 py-2.5 rounded-lg border border-slate-700/50 transition-colors">
                    <Navigation className="w-3.5 h-3.5 text-lime-400" />
                    <span>Get Directions</span>
                  </button>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">No dealers found.</p>
            )}
          </div>

          <div className="relative w-full h-[400px] lg:h-[420px] rounded-2xl overflow-hidden border border-slate-800 bg-[#101726]">
            <iframe
              title="Dealer Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d217759.99380839958!2d74.19430635174549!3d31.48310366035043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23add615333709f!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen={false}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full mt-12 pt-6 border-t border-slate-800/60 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 bg-[#0b101d] p-4 rounded-xl border border-slate-800/60">
          <div className="p-2 rounded-lg bg-lime-500/10 text-lime-400">
            <Award className="w-5 h-5" />
          </div>
          <span className="text-xs md:text-sm font-medium text-slate-300">
            Authorized Dealers
          </span>
        </div>

        <div className="flex items-center gap-3 bg-[#0b101d] p-4 rounded-xl border border-slate-800/60">
          <div className="p-2 rounded-lg bg-lime-500/10 text-lime-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xs md:text-sm font-medium text-slate-300">
            Genuine Products
          </span>
        </div>

        <div className="flex items-center gap-3 bg-[#0b101d] p-4 rounded-xl border border-slate-800/60">
          <div className="p-2 rounded-lg bg-lime-500/10 text-lime-400">
            <Headphones className="w-5 h-5" />
          </div>
          <span className="text-xs md:text-sm font-medium text-slate-300">
            Expert Guidance
          </span>
        </div>
      </div>
    </div>
  );
}