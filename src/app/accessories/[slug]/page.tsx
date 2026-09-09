"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { addToCart } from "@/app/redux/cart-slice";
import accessoriesData from "../../../accessories-data/accessories.json";

export default function AccessoryDetail() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const currentSlug = typeof params.slug === "string" ? params.slug : "";

  const accessory = accessoriesData.accessories.find(
    (item) =>
      String(item.id) === String(currentSlug) ||
      item.name.toLowerCase().replace(/\s+/g, "-") ===
        currentSlug.toLowerCase(),
  );

  const handleAddToCart = () => {
    if (!accessory) return;
    dispatch(
      addToCart({
        id: accessory.id as any,
        name: accessory.name,
        price: Number(accessory.price || 0),
        image: accessory.image,
        quantity: 1,
      })
    );
  };

  const handleBuyNow = () => {
    if (!accessory) return;
    const singleOrderProduct = {
      id: accessory.id,
      name: accessory.name,
      price: Number(accessory.price || 0),
      image: accessory.image,
      quantity: 1,
    };
    localStorage.setItem("directCheckoutItem", JSON.stringify(singleOrderProduct));
    router.push("/shipping");
  };

  if (!accessory) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-screen flex-col items-center justify-center bg-[#07151d] text-white"
      >
        <h1 className="mb-4 text-3xl font-bold">Accessory Not Found</h1>
        <p className="text-gray-400 mb-4">
          Searching for Slug: {currentSlug}
        </p>
        <Link
          href="/accessories"
          className="text-blue-400 underline hover:text-blue-300"
        >
          Go back to Accessories
        </Link>
      </motion.div>
    );
  }

  return (
    <section className="min-h-screen w-full bg-[#07151d] px-6 py-12 md:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/accessories"
            className="inline-flex items-center text-sm font-medium text-gray-400 transition-colors hover:text-white"
          >
            <span className="mr-2">←</span> Back to Accessories
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex h-[400px] items-center justify-center rounded-xl border border-[#1c3039] bg-[#0b1b24] p-8 lg:h-[500px]"
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              src={accessory.image}
              alt={accessory.name}
              className="max-h-full w-auto object-contain drop-shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-center pt-4 lg:pt-0"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold text-white md:text-5xl"
            >
              {accessory.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 text-3xl font-semibold text-[#8fdf0d]"
            >
              {accessory.priceText}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-base leading-relaxed text-gray-400"
            >
              {accessory.description}
            </motion.p>

            {accessory.features && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6"
              >
                <h3 className="text-lg font-semibold text-[#8fdf0d] mb-2">
                  Key Features:
                </h3>
                <ul className="list-inside list-disc text-gray-400 space-y-1 text-sm">
                  {accessory.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.6 + index * 0.08,
                      }}
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <motion.button
                type="button"
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 rounded-lg bg-[#8fdf0d] px-8 py-3.5 text-center text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                Add to Cart
              </motion.button>

              <motion.button
                type="button"
                onClick={handleBuyNow}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 rounded-lg border border-[#31444c] bg-[#10232d] px-8 py-3.5 text-center text-sm font-bold text-[#8fdf0d] transition-colors hover:bg-[#1c3039] cursor-pointer"
              >
                Buy Now
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8 border-t border-[#1c3039] pt-6"
            >
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <span className="font-semibold text-gray-300">
                    Availability:{" "}
                  </span>
                  {accessory.inStock ? (
                    <span className="text-green-500">In Stock</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}