"use client";

import {
  Phone,
  Mail,
  MapPin,
  Zap,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    inquiry: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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

    setSuccess("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: "",
      email: "",
      inquiry: "",
      message: "",
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.inquiry) {
      newErrors.inquiry = "Please select an inquiry type";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    setSuccess("Your message has been sent successfully!");

    setFormData({
      name: "",
      email: "",
      inquiry: "General Inquiry",
      message: "",
    });
  };

  return (
    <main className="min-h-screen bg-[#071019] px-5 py-8 text-white">
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-5xl font-semibold tracking-tight">
            Contact Us
          </h1>

          <p className="mt-1 text-lg text-[#A8B0BC]">
            We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-3"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              whileHover={{ x: 5 }}
              className="flex h-[66px] items-center gap-4 rounded-[9px] border border-[#263544] bg-[#0C1721] px-5"
            >
              <Phone className="h-6 w-6 text-[#8BCB00]" />

              <div>
                <p className="text-[15px] text-[#D5D9DF]">Call Us</p>

                <p className="mt-0.5 text-[13px] text-white">
                  +92 300 1234567
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              whileHover={{ x: 5 }}
              className="flex h-[66px] items-center gap-4 rounded-[9px] border border-[#263544] bg-[#0C1721] px-5"
            >
              <Mail className="h-6 w-6 text-[#8BCB00]" />

              <div>
                <p className="text-[15px] text-[#D5D9DF]">Email Us</p>

                <p className="mt-0.5 text-[13px] text-white">
                  info@evinn.pk
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              whileHover={{ x: 5 }}
              className="flex h-[66px] items-center gap-4 rounded-[9px] border border-[#263544] bg-[#0C1721] px-5"
            >
              <MapPin className="h-6 w-6 text-[#8BCB00]" />

              <div>
                <p className="text-[15px] text-[#D5D9DF]">Visit Us</p>

                <p className="mt-0.5 text-[13px] text-white">
                  Lahore, Pakistan
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="pt-3"
            >
              <h2 className="mb-4 text-[20px] font-medium">Follow Us</h2>

              <div className="flex gap-3">
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1769E0]"
                >
                  <span className="text-[20px] font-bold">f</span>
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1478B8]"
                >
                  <Phone className="h-5 w-5" />
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45]"
                >
                  <FaInstagram />
                </motion.a>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E52B32]"
                >
                  <FaYoutube />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-[10px] border border-[#263544] bg-[#0C1721] p-4"
          >
            <form onSubmit={handleSubmit} noValidate>
              <motion.input
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className={`mb-1 h-[40px] w-full rounded-[7px] border ${
                  errors.name ? "border-red-500" : "border-[#263544]"
                } bg-[#0A141D] px-3 text-[15px] text-white outline-none placeholder:text-[#87909C] focus:border-[#8BCB00]`}
              />

              {errors.name && (
                <p className="mb-3 text-xs text-red-500">{errors.name}</p>
              )}

              {!errors.name && <div className="mb-3" />}

              <motion.input
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className={`mb-1 h-[40px] w-full rounded-[7px] border ${
                  errors.email ? "border-red-500" : "border-[#263544]"
                } bg-[#0A141D] px-3 text-[15px] text-white outline-none placeholder:text-[#87909C] focus:border-[#8BCB00]`}
              />

              {errors.email && (
                <p className="mb-3 text-xs text-red-500">{errors.email}</p>
              )}

              {!errors.email && <div className="mb-3" />}

              <motion.select
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                name="inquiry"
                value={formData.inquiry}
                onChange={handleChange}
                className={`mb-1 h-[40px] w-full rounded-[7px] border ${
                  errors.inquiry ? "border-red-500" : "border-[#263544]"
                } bg-[#0A141D] px-3 text-[15px] text-[#87909C] outline-none focus:border-[#8BCB00]`}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Support">Support</option>
                <option value="Business Inquiry">Business Inquiry</option>
              </motion.select>

              {errors.inquiry && (
                <p className="mb-3 text-xs text-red-500">
                  {errors.inquiry}
                </p>
              )}

              {!errors.inquiry && <div className="mb-3" />}

              <motion.textarea
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className={`mb-1 h-[115px] w-full resize-none rounded-[7px] border ${
                  errors.message ? "border-red-500" : "border-[#263544]"
                } bg-[#0A141D] px-3 py-3 text-[15px] text-white outline-none placeholder:text-[#87909C] focus:border-[#8BCB00]`}
              />

              {errors.message && (
                <p className="mb-3 text-xs text-red-500">
                  {errors.message}
                </p>
              )}

              {!errors.message && <div className="mb-3" />}

              {success && (
                <p className="mb-3 text-sm text-[#8BCB00]">{success}</p>
              )}

              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-[46px] w-full rounded-[7px] bg-[#82C900] text-[15px] font-medium text-white transition hover:bg-[#70B500]"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 grid grid-cols-3 rounded-[9px] border border-[#263544] bg-[#0C1721] px-5 py-5"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#8BCB00]">
              <Zap className="h-4 w-4 text-[#8BCB00]" />
            </div>

            <span className="text-[15px] text-[#E1E5EA]">
              Quick Response
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="flex items-center justify-center gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#8BCB00]">
              <Headphones className="h-4 w-4 text-[#8BCB00]" />
            </div>

            <span className="text-[15px] text-[#E1E5EA]">
              Dedicated Support
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            whileHover={{ y: -4 }}
            className="flex items-center justify-end gap-3"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#8BCB00]">
              <ShieldCheck className="h-4 w-4 text-[#8BCB00]" />
            </div>

            <span className="text-[15px] text-[#E1E5EA]">
              Your Mobility Partner
            </span>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}