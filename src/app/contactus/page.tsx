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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#071019] px-5 py-8 text-white">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-6">
          <h1 className="text-5xl font-semibold tracking-tight">Contact Us</h1>

          <p className="mt-1 text-lg text-[#A8B0BC]">
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_1.1fr]">
          <div className="space-y-3">
            <div className="flex h-[66px] items-center gap-4 rounded-[9px] border border-[#263544] bg-[#0C1721] px-5">
              <Phone className="h-6 w-6 text-[#8BCB00]" />

              <div>
                <p className="text-[12px] text-[#D5D9DF]">Call Us</p>

                <p className="mt-0.5 text-[13px] text-white">+92 300 1234567</p>
              </div>
            </div>

            <div className="flex h-[66px] items-center gap-4 rounded-[9px] border border-[#263544] bg-[#0C1721] px-5">
              <Mail className="h-6 w-6 text-[#8BCB00]" />

              <div>
                <p className="text-[12px] text-[#D5D9DF]">Email Us</p>

                <p className="mt-0.5 text-[13px] text-white">info@evinn.pk</p>
              </div>
            </div>

            <div className="flex h-[66px] items-center gap-4 rounded-[9px] border border-[#263544] bg-[#0C1721] px-5">
              <MapPin className="h-6 w-6 text-[#8BCB00]" />

              <div>
                <p className="text-[12px] text-[#D5D9DF]">Visit Us</p>

                <p className="mt-0.5 text-[13px] text-white">
                  Lahore, Pakistan
                </p>
              </div>
            </div>

            <div className="pt-3">
              <h2 className="mb-4 text-[16px] font-medium">Follow Us</h2>

              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1769E0]"
                >
                  <span className="text-[20px] font-bold">f</span>
                </a>

                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1478B8]"
                >
                  <Phone className="h-5 w-5" />
                </a>

                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45]"
                >
                  <FaInstagram />
                </a>

                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E52B32]"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-[10px] border border-[#263544] bg-[#0C1721] p-4">
            <input
              type="text"
              placeholder="Your Name"
              className="mb-3 h-[40px] w-full rounded-[7px] border border-[#263544] bg-[#0A141D] px-3 text-[12px] text-white outline-none placeholder:text-[#87909C] focus:border-[#8BCB00]"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="mb-3 h-[40px] w-full rounded-[7px] border border-[#263544] bg-[#0A141D] px-3 text-[12px] text-white outline-none placeholder:text-[#87909C] focus:border-[#8BCB00]"
            />

            <select className="mb-3 h-[40px] w-full rounded-[7px] border border-[#263544] bg-[#0A141D] px-3 text-[12px] text-[#87909C] outline-none focus:border-[#8BCB00]">
              <option>General Inquiry</option>
              <option>Product Inquiry</option>
              <option>Support</option>
              <option>Business Inquiry</option>
            </select>

            <textarea
              placeholder="Your Message"
              className="mb-3 h-[115px] w-full resize-none rounded-[7px] border border-[#263544] bg-[#0A141D] px-3 py-3 text-[12px] text-white outline-none placeholder:text-[#87909C] focus:border-[#8BCB00]"
            />

            <button
              type="button"
              className="h-[46px] w-full rounded-[7px] bg-[#82C900] text-[13px] font-medium text-white transition hover:bg-[#70B500]"
            >
              Send Message
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 rounded-[9px] border border-[#263544] bg-[#0C1721] px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#8BCB00]">
              <Zap className="h-4 w-4 text-[#8BCB00]" />
            </div>

            <span className="text-[12px] text-[#E1E5EA]">Quick Response</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#8BCB00]">
              <Headphones className="h-4 w-4 text-[#8BCB00]" />
            </div>

            <span className="text-[12px] text-[#E1E5EA]">
              Dedicated Support
            </span>
          </div>

          <div className="flex items-center justify-end gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#8BCB00]">
              <ShieldCheck className="h-4 w-4 text-[#8BCB00]" />
            </div>

            <span className="text-[12px] text-[#E1E5EA]">
              Your Mobility Partner
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
