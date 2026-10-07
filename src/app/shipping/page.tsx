"use client";

import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import type { RootState, AppDispatch } from "@/app/redux/store";
import { clearCart } from "@/app/redux/cart-slice";

interface CreatedOrder {
  _id: string;
  bike: {
    _id: string;
    name: string;
    slug?: string;
    imageUrl?: string;
  } | null;
  bikeName: string;
  unitPrice: number;
  quantity: number;
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    phoneNumber: string;
    address: string;
    postalCode: string;
    city: string;
  };
  paymentMethod: string;
  status: string;
  createdAt: string;
}

interface OrderResponse {
  message?: string;
  order?: CreatedOrder;
}

export default function ShippingForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items,
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

  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >,
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

    setSubmitError("");
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

    setSubmitError("");
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
      newErrors.fullName =
        "Full name must be at least 3 characters";
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber =
        "Phone number is required";
      isValid = false;
    } else if (
      !/^(03\d{9}|\+92\d{10})$/.test(
        formData.phoneNumber.trim(),
      )
    ) {
      newErrors.phoneNumber =
        "Enter a valid Pakistani phone number";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    } else if (formData.address.trim().length < 5) {
      newErrors.address =
        "Address must be at least 5 characters";
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
      newErrors.postalCode =
        "Postal code is required";
      isValid = false;
    } else if (
      !/^\d{5}$/.test(
        formData.postalCode.trim(),
      )
    ) {
      newErrors.postalCode =
        "Postal code must be 5 digits";
      isValid = false;
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod =
        "Please select a payment method";
      isValid = false;
    }

    // Backend currently supports only COD.
    if (
      formData.paymentMethod &&
      formData.paymentMethod !== "cod"
    ) {
      newErrors.paymentMethod =
        "Currently only Cash on Delivery is available";
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    if (loading) {
      return;
    }

    try {
      setLoading(true);

      /*
       * Get checkout items.
       *
       * Normal checkout:
       * Redux cart
       *
       * Direct checkout:
       * localStorage directCheckoutItem
       */
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
        const directItem =
          localStorage.getItem(
            "directCheckoutItem",
          );

        if (directItem) {
          try {
            const parsed = JSON.parse(
              directItem,
            );

            finalItems = [
              {
                id: parsed.id,
                name: parsed.name,
                price: Number(parsed.price),
                image: parsed.image,
                quantity: parsed.quantity || 1,
              },
            ];
          } catch (error) {
            console.error(
              "Failed to read direct checkout item:",
              error,
            );
          }
        }
      }

      if (finalItems.length === 0) {
        setSubmitError(
          "Your cart is empty. Please add a vehicle before placing an order.",
        );
        return;
      }

      /*
       * Backend /api/orders accepts one bike per request.
       *
       * Therefore, if cart has multiple bikes,
       * create one order for each bike.
       */
      const createdOrders: CreatedOrder[] = [];

      for (const item of finalItems) {
        const response = await fetch(
          "https://evinn.evermontech.com/api/orders",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              bike: item.id,
              quantity: Number(
                item.quantity || 1,
              ),
              shippingAddress: {
                fullName:
                  formData.fullName.trim(),

                phoneNumber:
                  formData.phoneNumber.trim(),

                address:
                  formData.address.trim(),

                postalCode:
                  formData.postalCode.trim(),

                city: formData.city.trim(),
              },

              paymentMethod:
                "cash on delivery",
            }),
          },
        );

        const data: OrderResponse =
          await response
            .json()
            .catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            data?.message ||
              "Failed to place the order.",
          );
        }

        if (data.order) {
          createdOrders.push(data.order);
        }
      }

      /*
       * Save response for Order Success page.
       *
       * We keep the same lastOrder structure
       * so /order-placed can display it.
       */
      const orderData = {
        orderId:
          createdOrders.length === 1
            ? createdOrders[0]._id
            : createdOrders
                .map((order) => order._id)
                .join(", "),

        placedAt:
          createdOrders[0]?.createdAt ||
          new Date().toISOString(),

        items: createdOrders.map((order) => {
          const originalItem =
            finalItems.find(
              (item) =>
                String(item.id) ===
                String(order.bike?._id),
            );

          return {
            id:
              order.bike?._id ||
              originalItem?.id,

            name:
              order.bikeName ||
              originalItem?.name ||
              "Electric Vehicle",

            price: Number(
              order.unitPrice ||
                originalItem?.price ||
                0,
            ),

            image:
              order.bike?.imageUrl ||
              originalItem?.image ||
              "",

            quantity: Number(
              order.quantity || 1,
            ),
          };
        }),

        customer: {
          fullName:
            formData.fullName.trim(),

          phoneNumber:
            formData.phoneNumber.trim(),

          address:
            formData.address.trim(),

          city: formData.city.trim(),

          postalCode:
            formData.postalCode.trim(),

          paymentMethod:
            "cash on delivery",
        },

        apiOrders: createdOrders,
      };

      localStorage.setItem(
        "lastOrder",
        JSON.stringify(orderData),
      );

      localStorage.removeItem(
        "directCheckoutItem",
      );

      dispatch(clearCart());

      router.push("/order-placed");
    } catch (error) {
      console.error(
        "Place Order API Error:",
        error,
      );

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong while placing your order.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B0F17] px-4 py-10 text-white">
      <div className="w-full max-w-4xl rounded-2xl p-6">

        <h2 className="mb-6 text-3xl font-semibold">
          Shipping Details
        </h2>

        {submitError && (
          <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {submitError}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Full Name + Phone */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>
              <label className="mb-1 block text-xs text-gray-400">
                Full Name{" "}
                <span className="text-green-400">
                  *
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-[#121824] px-4 py-3 text-sm text-white transition focus:border-green-400 focus:outline-none ${
                  errors.fullName
                    ? "border-red-500"
                    : "border-gray-800"
                }`}
                required
              />

              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-400">
                Phone Number{" "}
                <span className="text-green-400">
                  *
                </span>
              </label>

              <input
                type="text"
                placeholder="Enter your number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-[#121824] px-4 py-3 text-sm text-white transition focus:border-green-400 focus:outline-none ${
                  errors.phoneNumber
                    ? "border-red-500"
                    : "border-gray-800"
                }`}
                required
              />

              {errors.phoneNumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

          </div>

          {/* Address */}

          <div>
            <label className="mb-1 block text-xs text-gray-400">
              Address{" "}
              <span className="text-green-400">
                *
              </span>
            </label>

            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-[#121824] px-4 py-3 text-sm text-white transition focus:border-green-400 focus:outline-none ${
                errors.address
                  ? "border-red-500"
                  : "border-gray-800"
              }`}
              required
            />

            {errors.address && (
              <p className="mt-1 text-xs text-red-500">
                {errors.address}
              </p>
            )}
          </div>

          {/* City + Postal Code */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div>
              <label className="mb-1 block text-xs text-gray-400">
                City{" "}
                <span className="text-green-400">
                  *
                </span>
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className={`w-full rounded-xl border bg-[#121824] px-4 py-3 text-sm text-white transition focus:border-green-400 focus:outline-none ${
                  errors.city
                    ? "border-red-500"
                    : "border-gray-800"
                }`}
                required
              />

              {errors.city && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.city}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-xs text-gray-400">
                Postal Code{" "}
                <span className="text-green-400">
                  *
                </span>
              </label>

              <input
                type="text"
                name="postalCode"
                placeholder="Enter your postal code"
                value={formData.postalCode}
                onChange={handleChange}
                className={`w-full rounded-xl border bg-[#121824] px-4 py-3 text-sm text-white transition focus:border-green-400 focus:outline-none ${
                  errors.postalCode
                    ? "border-red-500"
                    : "border-gray-800"
                }`}
                required
              />

              {errors.postalCode && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.postalCode}
                </p>
              )}
            </div>

          </div>

          {/* Payment */}

          <div className="pt-4">

            <h3 className="mb-4 text-xl font-semibold">
              Payment Method
            </h3>

            <div className="space-y-3">

              {/* JazzCash / Easypaisa */}

              <div
                onClick={() =>
                  handlePaymentSelect(
                    "jazzcash",
                  )
                }
                className={`flex cursor-not-allowed items-start rounded-xl border p-4 opacity-50 transition ${
                  formData.paymentMethod ===
                  "jazzcash"
                    ? "border-gray-700 bg-[#121824]/60"
                    : "border-gray-800 bg-[#121824]"
                }`}
              >
                <div className="mt-0.5 flex h-5 items-center">

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      formData.paymentMethod ===
                      "jazzcash"
                        ? "border-green-400"
                        : "border-gray-600"
                    }`}
                  >
                    {formData.paymentMethod ===
                      "jazzcash" && (
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    )}
                  </div>

                </div>

                <div className="ml-3">

                  <p className="text-sm font-medium text-white">
                    JazzCash / Easypaisa
                  </p>

                  <p className="text-xs text-gray-400">
                    Currently unavailable
                  </p>

                </div>
              </div>

              {/* Bank */}

              <div
                onClick={() =>
                  handlePaymentSelect("bank")
                }
                className={`flex cursor-not-allowed items-start rounded-xl border p-4 opacity-50 transition ${
                  formData.paymentMethod ===
                  "bank"
                    ? "border-gray-700 bg-[#121824]/60"
                    : "border-gray-800 bg-[#121824]"
                }`}
              >
                <div className="mt-0.5 flex h-5 items-center">

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      formData.paymentMethod ===
                      "bank"
                        ? "border-green-400"
                        : "border-gray-600"
                    }`}
                  >
                    {formData.paymentMethod ===
                      "bank" && (
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    )}
                  </div>

                </div>

                <div className="ml-3">

                  <p className="text-sm font-medium text-white">
                    Bank Transfer
                  </p>

                  <p className="text-xs text-gray-400">
                    Currently unavailable
                  </p>

                </div>
              </div>

              {/* COD */}

              <div
                onClick={() =>
                  handlePaymentSelect("cod")
                }
                className={`flex cursor-pointer items-start rounded-xl border p-4 transition ${
                  formData.paymentMethod ===
                  "cod"
                    ? "border-gray-700 bg-[#121824]/60"
                    : "border-gray-800 bg-[#121824]"
                }`}
              >
                <div className="mt-0.5 flex h-5 items-center">

                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                      formData.paymentMethod ===
                      "cod"
                        ? "border-green-400"
                        : "border-gray-600"
                    }`}
                  >
                    {formData.paymentMethod ===
                      "cod" && (
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
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
              <p className="mt-2 text-xs text-red-500">
                {errors.paymentMethod}
              </p>
            )}

          </div>

          {/* Submit */}

          <div className="pt-4">

            <button
              type="submit"
              disabled={loading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#A3E635] py-3.5 font-semibold text-black transition hover:bg-[#8acc27] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Placing Order..."
                : "Confirm Order"}

              {!loading && (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}