"use client";

import React, { useState } from "react";
import {ArrowRight } from "lucide-react";
import Link from "next/link";
export default function ShippingForm() {
  const [formData, setFormData] = useState({
    fullName: "Full name",
    phoneNumber: "Phone number",
    address: "Address",
    city: "City",
    postalCode: "Postal code",
    paymentMethod: "jazzcash",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSelect = (method: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="min-h-screen  bg-[#0B0F17] text-white flex justify-center items-center ">
      <div className="w-400 max-w-lg  p-6 rounded-2xl">
        <h2 className="text-3xl font-semibold mb-6">Shipping Details</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Full Name <span className="text-green-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-[#121824] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Phone Number <span className="text-green-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full bg-[#121824] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Address <span className="text-green-400">*</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-[#121824] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                City <span className="text-green-400">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="w-full bg-[#121824] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">
                Postal Code <span className="text-green-400">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                placeholder="Enter your postal code"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full bg-[#121824] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-xl font-semibold mb-4">Payment Method</h3>

            <div className="space-y-3">
              <div
                onClick={() => handlePaymentSelect("jazzcash")}
                className={`flex items-start p-4 rounded-xl border cursor-pointer transition ${
                  formData.paymentMethod === "jazzcash"
                    ? "border-gray-700 bg-[#121824]/60"
                    : "border-gray-800 bg-[#121824]"
                }`}
              >
                <div className="flex items-center h-5 mt-0.5">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      formData.paymentMethod === "jazzcash"
                        ? "border-green-400"
                        : "border-gray-600"
                    }`}
                  >
                    {formData.paymentMethod === "jazzcash" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    JazzCash / Easypaisa
                  </p>
                  <p className="text-xs text-gray-400">
                    Pay via JazzCash or Easypaisa
                  </p>
                </div>
              </div>

              <div
                onClick={() => handlePaymentSelect("bank")}
                className={`flex items-start p-4 rounded-xl border cursor-pointer transition ${
                  formData.paymentMethod === "bank"
                    ? "border-gray-700 bg-[#121824]/60"
                    : "border-gray-800 bg-[#121824]"
                }`}
              >
                <div className="flex items-center h-5 mt-0.5">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      formData.paymentMethod === "bank"
                        ? "border-green-400"
                        : "border-gray-600"
                    }`}
                  >
                    {formData.paymentMethod === "bank" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    Bank Transfer
                  </p>
                  <p className="text-xs text-gray-400">Pay via bank transfer</p>
                </div>
              </div>

              <div
                onClick={() => handlePaymentSelect("cod")}
                className={`flex items-start p-4 rounded-xl border cursor-pointer transition ${
                  formData.paymentMethod === "cod"
                    ? "border-gray-700 bg-[#121824]/60"
                    : "border-gray-800 bg-[#121824]"
                }`}
              >
                <div className="flex items-center h-5 mt-0.5">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      formData.paymentMethod === "cod"
                        ? "border-green-400"
                        : "border-gray-600"
                    }`}
                  >
                    {formData.paymentMethod === "cod" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    )}
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    Cash on Delivery
                  </p>
                  <p className="text-xs text-gray-400">
                    Pay when you receive the order
                  </p>
                </div>
              </div>
            </div>
          </div>

        <div className="pt-4">
  <Link href="/order-placed"> 
    <button
      type="button" 
      className="w-full bg-[#A3E635] hover:bg-[#8acc27] text-black font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition"
    >
      Confirm Order <ArrowRight className="w-4 h-4" />
    </button>
  </Link>
</div>
        </form>
      </div>
    </div>
  );
}
