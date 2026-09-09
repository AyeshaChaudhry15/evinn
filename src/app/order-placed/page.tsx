"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, ArrowRight } from "lucide-react";

interface OrderItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface OrderData {
  orderId: string;
  placedAt: string;
  items: OrderItem[];
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
   
    const savedOrder = localStorage.getItem("lastOrder");

    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrder(parsedOrder);
      } catch (error) {
        console.error("Failed to read order:", error);
      }
    }
  }, []);

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString("en-PK")}`;
  };

  if (!order) {
    return (
      <main className="min-h-screen bg-[#06111A] px-4 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl font-bold">No order found</h1>

          <p className="mt-3 text-sm text-gray-400">
            Your order details could not be found.
          </p>

          <Link
            href="/vehicles"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#8FDF0D] px-7 py-3 font-bold text-[#06111A] transition hover:scale-[1.02]"
          >
            Continue Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#06111A] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[900px]">

        <div className="flex flex-col items-center text-center">

          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-[#8FDF0D] shadow-[0_0_25px_rgba(143,223,13,0.25)]">
            <Check
              size={48}
              strokeWidth={3}
              className="text-[#8FDF0D]"
            />

            <span className="absolute -left-7 top-2 text-[#8FDF0D]">
              ✦
            </span>

            <span className="absolute -right-7 top-5 text-[#8FDF0D]">
              ✦
            </span>

            <span className="absolute -right-5 bottom-1 text-[#8FDF0D]">
              ✦
            </span>

            <span className="absolute -left-6 bottom-0 text-[#8FDF0D]">
              ✦
            </span>
          </div>

          <h1 className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl">
            Order Placed!
          </h1>

          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Your order has been placed successfully.
          </p>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            You will receive a confirmation email and SMS shortly.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-[#19313D] bg-[#081721] shadow-[0_10px_40px_rgba(0,0,0,0.25)]">

          <div className="flex flex-col gap-5 border-b border-[#19313D] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <div>
              <h2 className="text-lg font-bold text-white">
                Order #{order.orderId}
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Placed on:{" "}
                <span className="text-gray-300">
                  {order.placedAt}
                </span>
              </p>
            </div>

       <Link href={"/summary"}>
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("order-items")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
              }}
              className="w-full rounded-lg border border-[#8FDF0D]/70 px-6 py-3 text-sm font-bold text-[#8FDF0D] transition hover:bg-[#8FDF0D] hover:text-[#06111A] sm:w-auto"
            >
              View Details
            </button>
            </Link>
          </div>

          <div id="order-items" className="px-5 py-6 sm:px-6">

            <h3 className="mb-5 text-base font-bold text-white">
              Order Items ({order.items.length})
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border border-[#19313D] bg-[#07141D] p-4 transition hover:border-[#8FDF0D]/30"
                >

                  <div className="relative h-[96px] w-[96px] shrink-0 overflow-hidden rounded-lg border border-[#243D49] bg-[#0B1B25]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-2"
                      sizes="96px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">

                    <h4 className="truncate text-sm font-semibold text-white">
                      {item.name}
                    </h4>

                    <p className="mt-1 text-sm text-gray-400">
                      {formatPrice(item.price)}
                    </p>

                    <p className="mt-2 text-sm text-gray-400">
                      Qty:{" "}
                      <span className="font-semibold text-gray-200">
                        {item.quantity}
                      </span>
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Item Total:{" "}
                      <span className="text-gray-300">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </p>

                  </div>
                </div>
              ))}

            </div>

            <div className="mt-6 border-t border-[#19313D] pt-5">

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>Items</span>

                <span>
                  {order.items.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-white">
                  Total Amount
                </span>

                <span className="text-xl font-bold text-[#8FDF0D]">
                  {formatPrice(
                    order.items.reduce(
                      (total, item) =>
                        total + item.price * item.quantity,
                      0
                    )
                  )}
                </span>
              </div>

            </div>
          </div>
        </div>

        <Link
          href="/vehicles"
          className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#8FDF0D] px-6 py-4 text-sm font-bold text-[#06111A] transition hover:scale-[1.01] hover:bg-[#9BEF18]"
        >
          Continue Shopping
        </Link>

      </div>
    </main>
  );
}