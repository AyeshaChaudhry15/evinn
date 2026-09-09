"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-4 inline-block rounded-full border border-[#2f5c3a] bg-[#0e1f14] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#8FDF0D]"
          >
            Privacy
          </motion.span>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Privacy Policy
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#AEB7BC] sm:text-base"
          >
            Your privacy is important to us. This Privacy Policy explains how
            EVINN collects, uses and protects your information.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-3 text-xs text-[#78858C]"
          >
            Last updated: September 2026
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-2xl border border-[#23333D] bg-[#0A151E] p-5 sm:p-8 lg:p-10"
        >
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] pb-7"
          >
            <h2 className="text-xl font-bold">1. Introduction</h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              EVINN respects your privacy and is committed to protecting
              personal information that may be collected when you use our
              website, contact us, browse vehicle information or use our
              services.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold">2. Information We Collect</h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              Depending on how you interact with our website, we may collect
              information such as your name, email address, phone number and
              other information that you voluntarily provide through forms or
              inquiries.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold">
              3. Automatically Collected Information
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              When you visit our website, certain technical information may be
              collected automatically. This may include browser type, device
              information, approximate location, pages visited and general usage
              information.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold">
              4. How We Use Your Information
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              Information may be used to respond to inquiries, provide requested
              services, improve our website, communicate with users, understand
              website usage and maintain the security and functionality of our
              services.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold">5. Cookies</h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              Our website may use cookies or similar technologies to improve
              website functionality, remember preferences and understand how
              visitors interact with the website.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold">6. Sharing of Information</h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              EVINN does not sell or rent your personal information. We may
              share information with trusted service providers when necessary to
              operate our website or provide requested services, or when
              required by applicable law.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold">7. Data Security</h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              We take reasonable measures to protect information against
              unauthorized access, misuse, alteration or disclosure. However, no
              internet transmission or storage system can be guaranteed to be
              completely secure.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold">8. Third-Party Websites</h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              Our website may include links to external websites. We are not
              responsible for the privacy practices or content of those
              third-party websites. We recommend reviewing their privacy
              policies before providing personal information.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold">9. Children's Privacy</h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              Our website is not intended to knowingly collect personal
              information from children. If you believe that a child has
              provided personal information to us, please contact us so that
              appropriate action can be taken.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border-b border-[#1c2830] py-7"
          >
            <h2 className="text-xl font-bold">10. Your Privacy Choices</h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              Depending on applicable law, you may have rights regarding your
              personal information, including requesting access, correction or
              deletion of information you have provided to us.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="pt-7"
          >
            <h2 className="text-xl font-bold">
              11. Changes to This Privacy Policy
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#AEB7BC]">
              We may update this Privacy Policy periodically. Any changes will
              be posted on this page with an updated revision date.
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
          <Link
            href="/"
            className="inline-flex rounded-full bg-[#8FDF0D] px-6 py-3 text-sm font-bold text-[#06111A] transition hover:opacity-90"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}