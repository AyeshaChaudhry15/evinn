"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import type { RootState, AppDispatch } from "@/app/redux/store";
import { clearCart } from "@/app/redux/cart-slice";

export default function ShippingForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handlePaymentSelect = (method: string) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
    }));

    setErrors((prev) => ({
      ...prev,
      paymentMethod: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      phoneNumber: "",
      address: "",
      city: "",
      postalCode: "",
      paymentMethod: "",
    };

    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^(03\d{9}|\+92\d{10})$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Enter a valid Pakistani phone number";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
      isValid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    } else if (formData.city.trim().length < 2) {
      newErrors.city = "Enter a valid city";
      isValid = false;
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
      isValid = false;
    } else if (!/^\d{5}$/.test(formData.postalCode.trim())) {
      newErrors.postalCode = "Postal code must be 5 digits";
      isValid = false;
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    let finalItems: any[] = [];

    if (cartItems && cartItems.length > 0) {
      finalItems = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        image: item.image,
        quantity: item.quantity || 1,
      }));
    } else {
      const directItem = localStorage.getItem("directCheckoutItem");

      if (directItem) {
        const parsed = JSON.parse(directItem);

        finalItems = [
          {
            id: parsed.id,
            name: parsed.name,
            price: Number(parsed.price),
            image: parsed.image,
            quantity: parsed.quantity || 1,
          },
        ];
      }
    }

    const orderData = {
      orderId: `EVN${Date.now().toString().slice(-6)}`,

      placedAt: new Date().toLocaleString("en-PK", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),

      items: finalItems,

      customer: {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        paymentMethod: formData.paymentMethod,
      },
    };

    localStorage.setItem(
      "lastOrder",
      JSON.stringify(orderData)
    );

    localStorage.removeItem("directCheckoutItem");

    dispatch(clearCart());

    router.push("/order-placed");
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-4xl p-6 rounded-2xl">

        <h2 className="text-3xl font-semibold mb-6">
          Shipping Details
        </h2>

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
                className={`w-full bg-[#121824] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition ${
                  errors.fullName ? "border-red-500" : "border-gray-800"
                }`}
                required
              />

              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName}
                </p>
              )}
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
                className={`w-full bg-[#121824] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition ${
                  errors.phoneNumber
                    ? "border-red-500"
                    : "border-gray-800"
                }`}
                required
              />

              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber}
                </p>
              )}
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
              className={`w-full bg-[#121824] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition ${
                errors.address ? "border-red-500" : "border-gray-800"
              }`}
              required
            />

            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address}
              </p>
            )}
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
                className={`w-full bg-[#121824] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition ${
                  errors.city ? "border-red-500" : "border-gray-800"
                }`}
                required
              />

              {errors.city && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.city}
                </p>
              )}
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
                className={`w-full bg-[#121824] border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-green-400 transition ${
                  errors.postalCode
                    ? "border-red-500"
                    : "border-gray-800"
                }`}
                required
              />

              {errors.postalCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.postalCode}
                </p>
              )}
            </div>

          </div>

          <div className="pt-4">

            <h3 className="text-xl font-semibold mb-4">
              Payment Method
            </h3>

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

                  <p className="text-xs text-gray-400">
                    Pay via bank transfer
                  </p>

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

            {errors.paymentMethod && (
              <p className="text-red-500 text-xs mt-2">
                {errors.paymentMethod}
              </p>
            )}

          </div>

          <div className="pt-4">

            <button
              type="submit"
              className="w-full bg-[#A3E635] hover:bg-[#8acc27] text-black font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer"
            >
              Confirm Order
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}