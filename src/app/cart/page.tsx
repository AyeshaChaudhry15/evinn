"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/cart-slice";

function formatPrice(price: number) {
  return `PKR ${price.toLocaleString("en-PK")}`;
}

export default function CartPage() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: any) => state.cart.items
  );

  const totalItems = cartItems.reduce(
    (total: number, item: any) =>
      total + item.quantity,
    0
  );

  const subtotal = cartItems.reduce(
    (total: number, item: any) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = 0;

  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-[#06111A] text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Your Cart ({totalItems})
          </h1>

          <Link
            href="/vehicles"
            className="
              flex items-center gap-2
              text-sm text-gray-300
              transition-colors
              hover:text-[#8fdf0d]
            "
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div
            className="
              flex min-h-[400px]
              flex-col items-center
              justify-center
              rounded-2xl
              border border-white/10
              bg-[#0B1721]
              px-6 text-center
            "
          >
            <div
              className="
                mb-5 flex h-16 w-16
                items-center justify-center
                rounded-full
                bg-white/5
              "
            >
              <ShoppingBag
                size={30}
                className="text-gray-400"
              />
            </div>

            <h2 className="text-xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-2 max-w-md text-sm text-gray-500">
              Looks like you haven't added anything
              to your cart yet.
            </p>

            <Link
              href="/vehicles"
              className="
                mt-6 rounded-lg
                bg-[#8fdf0d]
                px-6 py-3
                text-sm font-semibold
                text-[#06111A]
                transition-colors
                hover:bg-[#a3f722]
              "
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

            <div className="space-y-4">

              {cartItems.map((item: any) => (
                <div
                  key={item.id}
                  className="
                    rounded-xl
                    border border-white/10
                    bg-[#0B1721]
                    p-4
                    transition-colors
                    hover:border-white/15
                  "
                >
                  <div className="flex gap-4">

                    <Link
                      href={item.link || "#"}
                      className="
                        flex h-[110px]
                        w-[110px]
                        flex-shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#07121B]
                      "
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={110}
                        height={110}
                        className="
                          h-full w-full
                          object-contain
                        "
                      />
                    </Link>

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <div>
                          <Link
                            href={item.link || "#"}
                            className="
                              text-base
                              font-medium
                              text-white
                              hover:text-[#8fdf0d]
                            "
                          >
                            {item.name}
                          </Link>

                          {item.color && (
                            <p className="mt-1 text-xs text-gray-500">
                              {item.color}
                            </p>
                          )}

                          {item.brand && (
                            <p className="mt-1 text-xs text-gray-600">
                              {item.brand}
                            </p>
                          )}

                          <p className="mt-2 text-sm text-gray-300">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        <p className="hidden text-sm font-medium text-gray-300 sm:block">
                          {formatPrice(
                            item.price * item.quantity
                          )}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between">

                        <div className="flex items-center gap-2">

                          <div
                            className="
                              flex h-9
                              items-center
                              rounded-md
                              border border-white/10
                              bg-[#07121B]
                            "
                          >
                            <button
                              onClick={() =>
                                dispatch(
                                  decrementQuantity(item.id)
                                )
                              }
                              className="
                                flex h-full w-9
                                items-center
                                justify-center
                                text-gray-400
                                transition-colors
                                hover:text-white
                              "
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>

                            <span
                              className="
                                flex w-7
                                justify-center
                                text-sm
                                text-white
                              "
                            >
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                dispatch(
                                  incrementQuantity(item.id)
                                )
                              }
                              className="
                                flex h-full w-9
                                items-center
                                justify-center
                                text-gray-400
                                transition-colors
                                hover:text-white
                              "
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              dispatch(
                                removeFromCart(item.id)
                              )
                            }
                            className="
                              flex h-9 w-9
                              items-center
                              justify-center
                              rounded-md
                              text-gray-500
                              transition-colors
                              hover:bg-red-500/10
                              hover:text-red-400
                            "
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <p className="text-sm font-medium text-gray-300 sm:hidden">
                          {formatPrice(
                            item.price * item.quantity
                          )}
                        </p>

                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start">

              <div
                className="
                  rounded-xl
                  border border-white/10
                  bg-[#0B1721]
                  p-5
                "
              >
                <h2 className="text-lg font-semibold">
                  Order Summary
                </h2>

                <div className="mt-5 space-y-4">

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">
                      Subtotal
                    </span>

                    <span className="font-medium text-gray-200">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/10 pb-4 text-sm">
                    <span className="text-gray-400">
                      Shipping
                    </span>

                    <span className="font-medium text-[#8fdf0d]">
                      Free
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-white">
                      Total
                    </span>

                    <span className="text-xl font-semibold text-white">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="
                    mt-6 flex w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    bg-[#8fdf0d]
                    px-5 py-3.5
                    text-sm font-semibold
                    text-[#06111A]
                    transition-all
                    hover:bg-[#a3f722]
                    active:scale-[0.99]
                  "
                >
                  Proceed to Checkout
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}