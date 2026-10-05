"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

interface Accessory {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
}

interface AccessoriesResponse {
  accessories: Accessory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export default function Accessories() {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get<AccessoriesResponse>(
          "/accessories",
          {
            params: {
              page: 1,
              limit: 100,
            },
          }
        );
        
        setAccessories(response.data.accessories || []);
      } catch (err: any) {
        console.error("Accessories API Error:", err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "Something went wrong while loading accessories."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  return (
    <section className="w-full bg-[#07151d] px-6 py-8 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-5 flex items-start justify-between"
      >
        <div>
          <h2 className="text-4xl font-semibold text-white">
            Accessories
          </h2>

          <p className="mt-1 max-w-[230px] text-md text-gray-300">
            Enhance your ride with premium accessories
          </p>
        </div>
      </motion.div>

      {loading && (
        <div className="flex min-h-[250px] items-center justify-center">
          <p className="text-gray-300">
            Loading accessories...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="flex min-h-[250px] items-center justify-center">
          <p className="text-red-400">
            {error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {accessories.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{ y: -6 }}
            >
              <Link
                href={`/accessories/${item.slug}`}
                className="group block rounded-lg border border-[#1c3039] bg-[#0b1b24] p-3 transition duration-300 hover:border-[#31444c] hover:bg-[#10232d]"
              >
                <div className="flex h-[105px] items-center justify-center">
                  <motion.img
                    src={item.imageUrl}
                    alt={item.name}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    className="h-[95px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-2">
                  <h3 className="text-sm font-medium text-white">
                    {item.name}
                  </h3>

                  <p className="mt-0.5 text-xs text-gray-300">
                    PKR {item.price.toLocaleString("en-PK")}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && !error && accessories.length === 0 && (
        <div className="flex min-h-[250px] items-center justify-center">
          <p className="text-gray-300">
            No accessories found.
          </p>
        </div>
      )}
    </section>
  );
}