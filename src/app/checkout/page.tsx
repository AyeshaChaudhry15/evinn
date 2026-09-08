"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#06111A] text-white">
      <div className="mx-auto max-w-5xl px-5 py-12">

        <Link
          href="/cart"
          className="
            mb-8 inline-flex
            items-center gap-2
            text-sm text-gray-400
            hover:text-[#8fdf0d]
          "
        >
          <ArrowLeft size={16} />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-semibold">
          Checkout
        </h1>

        <div className="mt-8 rounded-xl border border-white/10 bg-[#0B1721] p-6">
          <h2 className="text-lg font-semibold">
            Checkout Details
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Your checkout form will appear here.
          </p>
        </div>
      </div>
    </main>
  );
}