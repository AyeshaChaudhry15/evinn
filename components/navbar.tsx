"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Electric Bikes", href: "/electric-bikes" },
  { label: "Electric Scooters", href: "/electric-scooters" },
  { label: "Compare", href: "/compare-vehicles" },
  // { label: "Showrooms", href: "/showrooms" },
    { label: "Blog", href: "/blog" },


];

const ALL_PRODUCTS = [
  {
    id: "bike-1",
    name: "Revolt RV1+",
    brand: "Revolt",
    priceText: "PKR 680,000",
    image: "/hero1.png",
    link: "/model-detail",
  },
  {
    id: "bike-2",
    name: "Ultraviolette F77",
    brand: "Ultraviolette",
    priceText: "PKR 1,299,000",
    image: "/hero1.png",
    link: "/model-detail",
  },
  {
    id: "bike-3",
    name: "Trek Madone R",
    brand: "Trek",
    priceText: "PKR 1,500,000",
    image: "/hero1.png",
    link: "/model-detail",
  },
  {
    id: "bike-4",
    name: "Obern Baer",
    brand: "Obern",
    priceText: "PKR 840,500",
    image: "/hero1.png",
    link: "/model-detail",
  },
  {
    id: "bike-5",
    name: "Menor Aura",
    brand: "Menor",
    priceText: "PKR 1,099,500",
    image: "/hero1.png",
    link: "/model-detail",
  },
  {
    id: "bike-6",
    name: "Okla Truvio",
    brand: "Okla",
    priceText: "PKR 770,000",
    image: "/hero1.png",
    link: "/model-detail",
  },
  {
    id: "bike-7",
    name: "Kawasaki Rumpo",
    brand: "Kawasaki",
    priceText: "PKR 890,000",
    image: "/hero1.png",
    link: "/model-detail",
  },
  {
    id: "bike-8",
    name: "Ertuga One",
    brand: "Ertuga",
    priceText: "PKR 2,340,000",
    image: "/hero1.png",
    link: "/model-detail",
  },
  {
    id: "bike-9",
    name: "Kawhy HHH0009",
    brand: "Kawhy",
    priceText: "PKR 2,450,000",
    image: "/hero1.png",
    link: "/model-detail",
  },
  {
    id: "bike-10",
    name: "Revolt RV400",
    brand: "Revolt",
    priceText: "PKR 950,000",
    image: "/hero1.png",
    link: "/model-detail",
  },
  {
    id: "bike-11",
    name: "Trek Urban X",
    brand: "Trek",
    priceText: "PKR 1,200,000",
    image: "/hero1.png",
    link: "/model-detail",
  },
  {
    id: "bike-12",
    name: "Kawasaki E-One",
    brand: "Kawasaki",
    priceText: "PKR 1,750,000",
    image: "/hero1.png",
    link: "/model-detail",
  },
  {
    id: "scooter-1",
    name: "Ola S1 Pro",
    brand: "Ola",
    priceText: "PKR 549,000",
    image: "/hero2.png",
    link: "/model-detail",
  },
  {
    id: "scooter-2",
    name: "Ather 450X",
    brand: "Ather",
    priceText: "PKR 630,500",
    image: "/hero2.png",
    link: "/model-detail",
  },
  {
    id: "scooter-3",
    name: "TVS iQube",
    brand: "TVS",
    priceText: "PKR 799,000",
    image: "/hero2.png",
    link: "/model-detail",
  },
  {
    id: "scooter-4",
    name: "Bajaj Chetak",
    brand: "Bajaj",
    priceText: "PKR 549,000",
    image: "/hero2.png",
    link: "/model-detail",
  },
  {
    id: "scooter-5",
    name: "Hero Vida V1",
    brand: "Hero",
    priceText: "PKR 898,350",
    image: "/hero2.png",
    link: "/model-detail",
  },
  {
    id: "scooter-6",
    name: "Okla Truvio",
    brand: "Okla",
    priceText: "PKR 770,000",
    image: "/hero2.png",
    link: "/model-detail",
  },
  {
    id: "scooter-7",
    name: "Kawasaki Rumpo",
    brand: "Kawasaki",
    priceText: "PKR 890,000",
    image: "/hero2.png",
    link: "/model-detail",
  },
  {
    id: "scooter-8",
    name: "Ertuga One",
    brand: "Ertuga",
    priceText: "PKR 2,340,000",
    image: "/hero2.png",
    link: "/model-detail",
  },
  {
    id: "scooter-9",
    name: "Kawhy HHH0009",
    brand: "Kawhy",
    priceText: "PKR 2,450,000",
    image: "/hero2.png",
    link: "/model-detail",
  },
  {
    id: "scooter-10",
    name: "Revolt RV400",
    brand: "Revolt",
    priceText: "PKR 950,000",
    image: "/hero2.png",
    link: "/model-detail",
  },
  {
    id: "scooter-11",
    name: "Trek Urban X",
    brand: "Trek",
    priceText: "PKR 1,200,000",
    image: "/hero2.png",
    link: "/model-detail",
  },
  {
    id: "scooter-12",
    name: "Kawasaki E-One",
    brand: "Kawasaki",
    priceText: "PKR 1,750,000",
    image: "/hero2.png",
    link: "/model-detail",
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

        <div className="flex items-center gap-5 text-gray-300">
          <div className="relative" ref={searchRef}>
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="flex items-center transition-colors hover:text-[#8fdf0d]"
            >
              <Search size={20} />
            </button>

            {searchOpen && (
              <div
                className="
        absolute z-50
        right-0 top-1/2 mr-8 -translate-y-1/2
        w-[200px] max-w-[60vw]
        lg:right-0 lg:left-auto lg:top-full lg:mt-3 lg:mr-0
        lg:translate-y-0
        lg:w-[340px] lg:max-w-none
        rounded-xl border border-white/10 bg-[#0B0F0C] p-3
        shadow-[0_20px_50px_rgba(0,0,0,0.5)]
      "
              >
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search..."
                  className="h-10 w-full rounded-lg border border-white/10 bg-[#131A22] px-3 text-xs text-white outline-none placeholder:text-gray-500 focus:border-[#8fdf0d]"
                />

                {query.trim().length > 0 && (
                  <div className="mt-2 max-h-[260px] overflow-y-auto">
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
                              className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-8 w-8 flex-shrink-0 rounded-md object-contain"
                              />
                              <div className="min-w-0">
                                <p className="truncate text-xs font-medium text-white">
                                  {product.name}
                                </p>
                                <p className="text-[10px] text-[#8fdf0d]">
                                  {product.priceText}
                                </p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="px-2 py-2 text-xs text-gray-500">
                        No results found.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <Link
            href="/contact-us"
            className="hidden rounded-lg bg-[#8fdf0d] px-5 py-2.5 text-sm font-semibold text-[#0B0F0C] transition-colors hover:bg-[#a3f722] lg:block"
          >
            Contact Us
          </Link>

          <button
            className="text-gray-200 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/5 bg-[#0B0F0C] px-5 pb-6 lg:hidden">
          <ul className="mt-4 flex flex-col gap-4 text-sm font-medium text-gray-300">
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
            href="/contact-us"
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
