"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-[#06111A] px-4 py-10 text-white sm:px-6 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-5xl">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 inline-block rounded-full border border-[#2f5c3a] bg-[#0e1f14] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#8FDF0D]"
          >
            Legal
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Terms & Conditions
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#AEB7BC] sm:text-base"
          >
            Please read these Terms & Conditions carefully before using the
            EVINN website and services.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-3 text-xs text-[#78858C]"
          >
            Last updated: September 2026
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-2xl border border-[#23333D] bg-[#0A151E] p-5 sm:p-8 lg:p-10"
        >

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] pb-7"
          >
            <h2 className="text-xl font-bold text-white">
              1. Acceptance of Terms
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              By accessing and using the EVINN website, you agree to be bound
              by these Terms & Conditions. If you do not agree with any part
              of these terms, please discontinue use of the website.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold text-white">
              2. About EVINN
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              EVINN provides information about electric bikes, electric
              scooters, their specifications, features, prices, brands and
              related services. The information displayed on the website is
              provided for general informational purposes.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold text-white">
              3. Product Information
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              We make reasonable efforts to ensure that product names,
              specifications, images, prices and other information are
              accurate. However, product information may change without
              notice and EVINN does not guarantee that all information will
              always be completely accurate or up to date.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold text-white">
              4. Prices & Availability
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              Prices, availability and specifications of vehicles may change
              at any time. Any price displayed on the website should be
              considered subject to confirmation before purchase or booking.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold text-white">
              5. User Responsibilities
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              Users agree to use the website only for lawful purposes. You
              must not attempt to interfere with the operation of the website,
              misuse its content, or use the website for fraudulent or
              unauthorized activities.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold text-white">
              6. Intellectual Property
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              All website content, including text, graphics, logos, design,
              images, icons and other materials, is protected by applicable
              intellectual property laws. Content may not be copied,
              reproduced or distributed without appropriate permission.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold text-white">
              7. Third-Party Links
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              The website may contain links to third-party websites or
              services. EVINN is not responsible for the content, policies,
              availability or practices of third-party websites.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold text-white">
              8. Disclaimer
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              EVINN provides the website and its content on an
              “as available” basis. We do not guarantee that the website will
              always be available, error-free or completely accurate.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold text-white">
              9. Limitation of Liability
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              To the maximum extent permitted by applicable law, EVINN will
              not be responsible for losses or damages resulting from the use
              of, or inability to use, the website or information provided
              through it.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-7"
          >
            <h2 className="text-xl font-bold text-white">
              10. Changes to These Terms
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              EVINN may update these Terms & Conditions from time to time.
              Updated terms will be posted on this page, and continued use of
              the website after changes means you accept the updated terms.
            </p>
          </motion.section>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/"
              className="inline-flex rounded-full bg-[#8FDF0D] px-6 py-3 text-sm font-bold text-[#06111A] transition hover:opacity-90"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </main>
  );
}