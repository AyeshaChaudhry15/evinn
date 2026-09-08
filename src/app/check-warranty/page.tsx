"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Search, X } from "lucide-react";
import { products, type Product } from "../../warranty-data/products";

export default function CheckWarrantyPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return products;
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(product: Product) {
    setSelected(product);
    setQuery(product.name);
    setIsOpen(false);
  }

  function handleClear() {
    setSelected(null);
    setQuery("");
    setIsOpen(true);
  }

  return (
    <main className="bg-[#0b0f14] text-white min-h-screen">
      <section className="px-4 sm:px-6 md:px-10 max-w-3xl mx-auto py-14 sm:py-20">
        <Link href="/" className="text-lime-300 text-sm hover:underline">
          ← Back to home
        </Link>

        <div className="flex items-center gap-3 mt-6 mb-3">
          <ShieldCheck className="w-8 h-8 text-lime-400" strokeWidth={1.5} />
          <h1 className="text-3xl sm:text-4xl font-bold">
            Check Warranty for Your Model
          </h1>
        </div>
        <p className="text-gray-400 text-base sm:text-lg mb-8">
         Select your model to check its warranty coverage and details.
        </p>

        <div ref={wrapperRef} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
              setIsOpen(true);
            }}
            placeholder="Search or select your model..."
            className="w-full rounded-xl bg-[#12181f] border border-white/10 text-white pl-11 pr-10 py-3.5 text-base focus:outline-none focus:border-lime-400/60 transition-colors"
          />
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {isOpen && (
            <div className="absolute z-10 mt-2 w-full rounded-xl border border-white/10 bg-[#12181f] shadow-xl overflow-hidden max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-left transition-colors border-b border-white/5 last:border-0"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#0b0f14] shrink-0">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-gray-500">
                        {p.brand} · {p.type === "bike" ? "Bike" : "Scooter"}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">
                      {p.priceText}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-4 text-sm text-gray-500">
                  Koi model nahi mila &quot;{query}&quot; ke liye.
                </div>
              )}
            </div>
          )}
        </div>

        {selected && (
          <div className="mt-8 rounded-2xl border border-lime-400/30 bg-[#12181f] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#0b0f14] shrink-0">
                <Image
                  src={selected.image}
                  alt={selected.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-lime-300">
                  {selected.name}
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  {selected.brand} · {selected.priceText}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-[#0b0f14] border border-white/10 px-5 py-4">
              <p className="text-gray-400 text-sm">Warranty Period</p>
              <p className="text-xl font-semibold mt-1">
                {selected.specs.warranty === "N/A"
                  ? "Contact us for warranty details"
                  : selected.specs.warranty}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="rounded-lg bg-[#0b0f14] border border-white/10 px-4 py-3">
                <p className="text-gray-500 text-xs">Range</p>
                <p className="text-sm font-medium mt-1">{selected.specs.range}</p>
              </div>
              <div className="rounded-lg bg-[#0b0f14] border border-white/10 px-4 py-3">
                <p className="text-gray-500 text-xs">Top Speed</p>
                <p className="text-sm font-medium mt-1">{selected.specs.topSpeed}</p>
              </div>
              <div className="rounded-lg bg-[#0b0f14] border border-white/10 px-4 py-3">
                <p className="text-gray-500 text-xs">Battery</p>
                <p className="text-sm font-medium mt-1">{selected.specs.battery}</p>
              </div>
              <div className="rounded-lg bg-[#0b0f14] border border-white/10 px-4 py-3">
                <p className="text-gray-500 text-xs">Charging Time</p>
                <p className="text-sm font-medium mt-1">{selected.specs.chargingTime}</p>
              </div>
              <div className="rounded-lg bg-[#0b0f14] border border-white/10 px-4 py-3">
                <p className="text-gray-500 text-xs">Motor Power</p>
                <p className="text-sm font-medium mt-1">{selected.specs.motorPower}</p>
              </div>
              <div className="rounded-lg bg-[#0b0f14] border border-white/10 px-4 py-3">
                <p className="text-gray-500 text-xs">Weight</p>
                <p className="text-sm font-medium mt-1">{selected.specs.weight}</p>
              </div>
            </div>

            <Link href="/contact">
              <button className="w-full sm:w-auto rounded-full bg-lime-400 text-black px-6 py-2.5 text-base font-medium hover:bg-lime-300 transition-colors">
                Need Help? Contact Us
              </button>
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}