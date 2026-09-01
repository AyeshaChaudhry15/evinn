"use client";

import { useState } from "react";
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

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F0C]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        <Link href="/" className="flex items-center text-xl font-bold tracking-tight">
          <span className="text-white">EV</span>
          <span className="text-[#8fdf0d]">INN</span>
        </Link>

        <ul className="hidden items-center gap-8 text-md font-medium text-gray-300 lg:flex">
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
          <button aria-label="Search" className="transition-colors hover:text-[#8fdf0d]">
            <Search size={18} />
          </button>
         
          {/* <button
            aria-label="Menu"
            className="rounded-md border border-white/10 p-2 transition-colors hover:border-[#8fdf0d] hover:text-[#8fdf0d]"
          >
            <Menu size={18} />
          </button> */}
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
          <ul className="flex flex-col gap-4 pt-4 text-sm font-medium text-gray-300">
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
          <div className="mt-4 flex items-center gap-5 border-t border-white/5 pt-4 text-gray-300">
            <Search size={18} />
            <MapPin size={18} />
          </div>
        </div>
      )}
    </header>
  );
}