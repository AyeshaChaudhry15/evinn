"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, Menu, X, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import vehiclesData from "../src/bike-details/bikes-scooter.json";
import accessoriesData from "../src/accessories-data/accessories.json";
import sparePartsData from "../src/spare-parts-data/spare-parts.json";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Electric Bikes", href: "/electric-bikes" },
  { label: "Electric Scooters", href: "/electric-scooters" },
  { label: "Compare", href: "/compare-vehicles" },
  { label: "About", href: "/about-us" },
  { label: "Blog", href: "/blog" },
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type SearchProduct = {
  id: string;
  name: string;
  brand?: string;
  priceText: string;
  image: string;
  category: "Bike" | "Scooter" | "Accessory" | "Spare Part";
  link: string;
};

function buildSearchIndex(): SearchProduct[] {
  const bikes: SearchProduct[] = (vehiclesData.bikes ?? []).map((b: any) => ({
    id: `bike-${b.id}`,
    name: b.name,
    brand: b.brand,
    priceText: b.priceText,
    image: b.image,
    category: "Bike",
    link: `/${b.slug}`,
  }));

  const scooters: SearchProduct[] = (vehiclesData.scooters ?? []).map(
    (s: any) => ({
      id: `scooter-${s.id}`,
      name: s.name,
      brand: s.brand,
      priceText: s.priceText,
      image: s.image,
      category: "Scooter",
      link: `/${s.slug}`,
    }),
  );

  const accessories: SearchProduct[] = (accessoriesData.accessories ?? []).map(
    (a: any) => ({
      id: `accessory-${a.id}`,
      name: a.name,
      priceText: a.priceText,
      image: a.image,
      category: "Accessory",
      link: `/${slugify(a.name)}`,
    }),
  );

  const spareParts: SearchProduct[] = (
    (sparePartsData as any)["spare-parts"] ?? []
  ).map((p: any) => ({
    id: `spare-${p.id}`,
    name: p.name,
    priceText: p.priceText,
    image: p.image,
    category: "Spare Part",
    link: `/${slugify(p.name)}`,
  }));

  return [...bikes, ...scooters, ...accessories, ...spareParts];
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);

  const ALL_PRODUCTS = useMemo(() => buildSearchIndex(), []);

  const cartItems = useSelector((state: any) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0,
  );

  const filteredProducts =
    query.trim().length > 0
      ? ALL_PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand?.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()),
        ).slice(0, 15)
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0B0F0C]/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="flex items-center text-xl font-bold tracking-tight"
          >
            <span className="text-white">EV</span>
            <span className="text-[#8fdf0d]">INN</span>
          </Link>
        </motion.div>

        <ul className="hidden items-center gap-8 text-lg font-medium text-gray-300 lg:flex">
          {NAV_LINKS.map((link, index) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
            >
              <Link
                href={link.href}
                className="transition-colors hover:text-[#8fdf0d]"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="flex items-center gap-5 text-gray-300"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex items-center gap-2" ref={searchRef}>
            <AnimatePresence>
              {searchOpen && (
                <motion.input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 150 }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.25 }}
                  className="
                    h-9 w-[150px] rounded-md
                    border border-white/10
                    bg-[#171B18]
                    px-3 text-sm text-white
                    outline-none
                    placeholder:text-gray-500
                    focus:border-[#8fdf0d]
                    sm:w-[180px]
                  "
                />
              )}
            </AnimatePresence>

            <motion.button
              aria-label="Search"
              onClick={() => setSearchOpen((v) => !v)}
              className="flex items-center transition-colors hover:text-[#8fdf0d]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search size={20} />
            </motion.button>

            <AnimatePresence>
              {searchOpen && query.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="
                    absolute right-0 top-full z-50 mt-2
                    w-[280px]
                    rounded-2xl
                    border border-white/10
                    bg-[#171B18]
                    p-2
                    shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                  "
                >
                  <div className="max-h-[280px] overflow-y-auto">
                    {filteredProducts.length > 0 ? (
                      <ul className="flex flex-col gap-1">
                        {filteredProducts.map((product, index) => (
                          <motion.li
                            key={product.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: index * 0.03,
                            }}
                          >
                            <Link
                              href={product.link}
                              onClick={() => {
                                setSearchOpen(false);
                                setQuery("");
                              }}
                              className="
                                flex items-center gap-2
                                rounded-lg px-2 py-1.5
                                transition-colors
                                hover:bg-white/5
                              "
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="
                                  h-8 w-8 flex-shrink-0
                                  rounded-md object-contain
                                "
                              />

                              <div className="min-w-0">
                                <p className="truncate text-xs font-medium text-white">
                                  {product.name}
                                </p>

                                <div className="flex items-center gap-1.5">
                                  <span className="text-[10px] text-[#8fdf0d]">
                                    {product.priceText}
                                  </span>

                                  <span className="text-[9px] text-gray-500">
                                    · {product.category}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-2 py-2 text-xs text-gray-500"
                      >
                        No results found.
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/cart"
            aria-label="Shopping cart"
            className="
              relative flex items-center
              transition-colors
              hover:text-[#8fdf0d]
            "
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ShoppingCart size={21} />
            </motion.div>

            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="
                    absolute -right-2 -top-2
                    flex h-[17px] min-w-[17px]
                    items-center justify-center
                    rounded-full
                    bg-[#8fdf0d]
                    px-1
                    text-[9px] font-bold
                    text-[#0B0F0C]
                  "
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact-us"
              className="
                hidden rounded-lg
                bg-[#8fdf0d]
                px-5 py-2.5
                text-sm font-semibold
                text-[#0B0F0C]
                transition-colors
                hover:bg-[#a3f722]
                lg:block
              "
            >
              Contact Us
            </Link>
          </motion.div>

          <motion.button
            className="text-gray-200 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </motion.div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/5 bg-[#0B0F0C] px-5 pb-6 lg:hidden"
          >
            <ul className="mt-4 flex flex-col gap-4 text-sm font-medium text-gray-300">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className="block py-1 transition-colors hover:text-[#8fdf0d]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="relative mt-4 flex items-center transition-colors hover:text-[#8fdf0d]"
              >
                <ShoppingCart size={21} />

                {cartCount > 0 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="
                      absolute -right-2 -top-2
                      flex h-[17px] min-w-[17px]
                      items-center justify-center
                      rounded-full
                      bg-[#8fdf0d]
                      px-1
                      text-[9px] font-bold
                      text-[#0B0F0C]
                    "
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </motion.span>
                )}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Link
                href="/contact-us"
                onClick={() => setMobileOpen(false)}
                className="
                  mt-3 block rounded-lg
                  bg-[#8fdf0d]
                  px-5 py-2.5
                  text-center text-sm
                  font-semibold
                  text-[#0B0F0C]
                "
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
