"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Brands", href: "/brands" },
  { label: "Electric Bikes", href: "/ElectricBikes" },
  { label: "Electric Scooters", href: "/ElectricScooters" },
  { label: "Compare", href: "/compare" },
  { label: "Showrooms", href: "/showrooms" },
];

const ALL_PRODUCTS = [
  {
    id: "bike-1",
    name: "Revolt RV1+",
    brand: "Revolt",
    priceText: "PKR 680,000",
    image: "/hero1.png",
    link: "/ModelDetail",
  },
  {
    id: "bike-2",
    name: "Ultraviolette F77",
    brand: "Ultraviolette",
    priceText: "PKR 1,299,000",
    image: "/hero1.png",
    link: "/ModelDetail",
  },
  {
    id: "bike-3",
    name: "Trek Madone R",
    brand: "Trek",
    priceText: "PKR 1,500,000",
    image: "/hero1.png",
    link: "/ModelDetail",
  },
  {
    id: "bike-4",
    name: "Obern Baer",
    brand: "Obern",
    priceText: "PKR 840,500",
    image: "/hero1.png",
    link: "/ModelDetail",
  },
  {
    id: "bike-5",
    name: "Menor Aura",
    brand: "Menor",
    priceText: "PKR 1,099,500",
    image: "/hero1.png",
    link: "/ModelDetail",
  },
  {
    id: "bike-6",
    name: "Okla Truvio",
    brand: "Okla",
    priceText: "PKR 770,000",
    image: "/hero1.png",
    link: "/ModelDetail",
  },
  {
    id: "bike-7",
    name: "Kawasaki Rumpo",
    brand: "Kawasaki",
    priceText: "PKR 890,000",
    image: "/hero1.png",
    link: "/ModelDetail",
  },
  {
    id: "bike-8",
    name: "Ertuga One",
    brand: "Ertuga",
    priceText: "PKR 2,340,000",
    image: "/hero1.png",
    link: "/ModelDetail",
  },
  {
    id: "bike-9",
    name: "Kawhy HHH0009",
    brand: "Kawhy",
    priceText: "PKR 2,450,000",
    image: "/hero1.png",
    link: "/ModelDetail",
  },
  {
    id: "bike-10",
    name: "Revolt RV400",
    brand: "Revolt",
    priceText: "PKR 950,000",
    image: "/hero1.png",
    link: "/ModelDetail",
  },
  {
    id: "bike-11",
    name: "Trek Urban X",
    brand: "Trek",
    priceText: "PKR 1,200,000",
    image: "/hero1.png",
    link: "/ModelDetail",
  },
  {
    id: "bike-12",
    name: "Kawasaki E-One",
    brand: "Kawasaki",
    priceText: "PKR 1,750,000",
    image: "/hero1.png",
    link: "/ModelDetail",
  },
  {
    id: "scooter-1",
    name: "Ola S1 Pro",
    brand: "Ola",
    priceText: "PKR 549,000",
    image: "/hero2.png",
    link: "/ModelDetail",
  },
  {
    id: "scooter-2",
    name: "Ather 450X",
    brand: "Ather",
    priceText: "PKR 630,500",
    image: "/hero2.png",
    link: "/ModelDetail",
  },
  {
    id: "scooter-3",
    name: "TVS iQube",
    brand: "TVS",
    priceText: "PKR 799,000",
    image: "/hero2.png",
    link: "/ModelDetail",
  },
  {
    id: "scooter-4",
    name: "Bajaj Chetak",
    brand: "Bajaj",
    priceText: "PKR 549,000",
    image: "/hero2.png",
    link: "/ModelDetail",
  },
  {
    id: "scooter-5",
    name: "Hero Vida V1",
    brand: "Hero",
    priceText: "PKR 898,350",
    image: "/hero2.png",
    link: "/ModelDetail",
  },
  {
    id: "scooter-6",
    name: "Okla Truvio",
    brand: "Okla",
    priceText: "PKR 770,000",
    image: "/hero2.png",
    link: "/ModelDetail",
  },
  {
    id: "scooter-7",
    name: "Kawasaki Rumpo",
    brand: "Kawasaki",
    priceText: "PKR 890,000",
    image: "/hero2.png",
    link: "/ModelDetail",
  },
  {
    id: "scooter-8",
    name: "Ertuga One",
    brand: "Ertuga",
    priceText: "PKR 2,340,000",
    image: "/hero2.png",
    link: "/ModelDetail",
  },
  {
    id: "scooter-9",
    name: "Kawhy HHH0009",
    brand: "Kawhy",
    priceText: "PKR 2,450,000",
    image: "/hero2.png",
    link: "/ModelDetail",
  },
  {
    id: "scooter-10",
    name: "Revolt RV400",
    brand: "Revolt",
    priceText: "PKR 950,000",
    image: "/hero2.png",
    link: "/ModelDetail",
  },
  {
    id: "scooter-11",
    name: "Trek Urban X",
    brand: "Trek",
    priceText: "PKR 1,200,000",
    image: "/hero2.png",
    link: "/ModelDetail",
  },
  {
    id: "scooter-12",
    name: "Kawasaki E-One",
    brand: "Kawasaki",
    priceText: "PKR 1,750,000",
    image: "/hero2.png",
    link: "/ModelDetail",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredProducts =
    query.trim().length > 0
      ? ALL_PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase()),
        )
      : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F0C]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center text-xl font-bold tracking-tight"
        >
          <span className="text-white">EV</span>
          <span className="text-[#8fdf0d]">INN</span>
        </Link>

        <ul className="hidden items-center gap-8 text-lg font-medium text-gray-300 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="transition-colors hover:text-[#8fdf0d]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-5 text-gray-300 lg:flex">
          <div className="relative" ref={searchRef}>
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="transition-colors hover:text-[#8fdf0d] pt-3"
            >
              <Search size={20} />
            </button>

            {searchOpen && (
              <div className="absolute right-0 top-[calc(100%+14px)] w-[340px] rounded-xl border border-white/10 bg-[#0B0F0C] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search bikes, scooters, brands..."
                  className="h-11 w-full rounded-lg border border-white/10 bg-[#131A22] px-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#8fdf0d]"
                />

                {query.trim().length > 0 && (
                  <div className="mt-2 max-h-[320px] overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                      <ul className="flex flex-col gap-1">
                        {filteredProducts.map((product) => (
                          <li key={product.id}>
                            <Link
                              href={product.link}
                              onClick={() => {
                                setSearchOpen(false);
                                setQuery("");
                              }}
                              className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/5"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-10 w-10 flex-shrink-0 rounded-md object-contain"
                              />
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-white">
                                  {product.name}
                                </p>
                                <p className="text-xs text-[#8fdf0d]">
                                  {product.priceText}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="px-2 py-3 text-sm text-gray-500">
                        No results found.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link
            href="/contactus"
            className="rounded-lg bg-[#8fdf0d] px-5 py-2.5 text-sm font-semibold text-[#0B0F0C] transition-colors hover:bg-[#a3f722]"
          >
            Contact Us
          </Link>
        </div>

        <button
          className="text-gray-200 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/5 bg-[#0B0F0C] px-5 pb-6 lg:hidden">
          <div className="relative mb-4 mt-4">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search bikes, scooters, brands..."
              className="h-11 w-full rounded-lg border border-white/10 bg-[#131A22] pl-9 pr-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-[#8fdf0d]"
            />
          </div>

          {query.trim().length > 0 && (
            <div className="mb-4 max-h-[280px] overflow-y-auto">
              {filteredProducts.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {filteredProducts.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={product.link}
                        onClick={() => {
                          setMobileOpen(false);
                          setQuery("");
                        }}
                        className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/5"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 flex-shrink-0 rounded-md object-contain"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-white">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#8fdf0d]">
                            {product.priceText}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-2 py-3 text-sm text-gray-500">
                  No results found.
                </p>
              )}
            </div>
          )}

          <ul className="flex flex-col gap-4 text-sm font-medium text-gray-300">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block py-1 transition-colors hover:text-[#8fdf0d]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 block rounded-lg bg-[#8fdf0d] px-5 py-2.5 text-center text-sm font-semibold text-[#0B0F0C] transition-colors hover:bg-[#a3f722]"
          >
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
}
