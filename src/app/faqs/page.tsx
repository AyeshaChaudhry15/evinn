"use client";

import { useState } from "react";
import { Plus, ChevronUp, ShieldCheck, MapPin } from "lucide-react";

const faqs = [
  {
    question: "What is the range of electric bikes?",
    answer:
      "Most electric bikes offer a range between 80-150 km on a single charge. The actual range can vary depending on the battery capacity, riding mode, rider weight, road conditions, and riding speed.",
  },
  {
    question: "How long does it take to charge?",
    answer:
      "Most electric bikes take around 4-6 hours to fully charge using a standard charger. Charging time may vary depending on the battery size, charger type, and the remaining battery level.",
  },
  {
    question: "Are EVs expensive to maintain?",
    answer:
      "No, electric bikes are generally less expensive to maintain than petrol bikes. They have fewer moving parts and do not require regular oil changes, spark plug replacements, or engine maintenance.",
  },
  {
    question: "Do you offer test rides?",
    answer:
      "Yes, test rides are available for selected electric bike models. A test ride allows you to experience the bike's performance, comfort, acceleration, braking, and overall riding experience before making a purchase.",
  },
  {
    question: "Is financing available?",
    answer:
      "Yes, financing options are available for eligible customers. You can choose from available installment plans based on the selected bike, payment terms, and financing partner requirements.",
  },
  {
    question: "Where can I find service centers?",
    answer:
      "You can find our authorized service centers through the service center locator. Our service centers provide routine maintenance, battery checks, repairs, software updates, and other after-sales support.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="min-h-screen bg-[#07101A] px-4 py-10 text-white sm:px-6 sm:py-14 md:py-16">
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-base text-gray-400 sm:mt-4 sm:text-lg md:mt-6 md:text-xl">
            Find answers to common questions.
          </p>
        </div>

        <div className="relative mt-8 sm:mt-10">
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-0
              flex
              items-center
              justify-center
              overflow-hidden
              md:hidden
            "
          >
            <div
              className="
                select-none
                text-[280px]
                font-bold
                leading-none
                text-[#6FAE32]
                opacity-[10px]
                drop-shadow-[0_0_55px_#6FAE32]
                sm:text-[340px]
              "
            >
              ?
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-[60%_40%] md:items-center">
            <div className="relative z-10 w-full max-w-[700px]">
              <div className="space-y-2">
                {faqs.map((faq, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <div
                      key={index}
                      className={`
                        w-full
                        overflow-hidden
                        rounded-xl
                        border
                        border-[#293746]
                        bg-[#0B151F]/95
                        backdrop-blur-sm
                        transition-all
                        duration-300
                        ${isOpen ? "shadow-lg shadow-black/20" : ""}
                      `}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFAQ(index)}
                        className="
                          flex
                          w-full
                          items-center
                          justify-between
                          gap-4
                          px-4
                          py-4
                          text-left
                          sm:px-5
                          sm:py-5
                        "
                      >
                        <span
                          className="
                            text-sm
                            font-medium
                            leading-5
                            text-[#F1F4F7]
                            sm:text-base
                          "
                        >
                          {faq.question}
                        </span>

                        {isOpen ? (
                          <ChevronUp
                            size={19}
                            className="shrink-0 text-gray-300"
                          />
                        ) : (
                          <Plus size={19} className="shrink-0 text-gray-300" />
                        )}
                      </button>

                      {isOpen && (
                        <div
                          className="
                            border-t
                            border-[#293746]
                            px-4
                            pb-5
                            pt-4
                            sm:px-5
                          "
                        >
                          <p className="text-sm leading-6 text-gray-400">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className="
                hidden
                h-full
                items-center
                justify-center
                overflow-hidden
                md:flex
              "
            >
              <div
                className="
                  select-none
                  text-[300px]
                  font-bold
                  leading-none
                  text-[#6FAE32]
                  opacity-50
                  drop-shadow-[0_0_65px_#6FAE32]
                  lg:text-[400px]
                "
              >
                ?
              </div>
            </div>
          </div>
        </div>

        <div
          className="
            relative
            z-10
            mt-8
            grid
            grid-cols-1
            gap-5
            rounded-xl
            border
            border-[#1D2B38]
            bg-[#0A141E]
            px-5
            py-6
            sm:mt-10
            sm:grid-cols-3
            sm:px-6
            sm:py-7
          "
        >
          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#72B82E]
              "
            >
              <ShieldCheck size={22} className="text-[#72B82E]" />
            </div>

            <div>
              <p className="text-sm text-gray-300">Transparent</p>

              <p className="text-sm text-gray-300">Information</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#72B82E]
              "
            >
              <span className="text-lg text-[#72B82E]">3</span>
            </div>

            <p className="text-sm text-gray-300">Trusted Guidance</p>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#72B82E]
              "
            >
              <MapPin size={21} className="text-[#72B82E]" />
            </div>

            <div>
              <p className="text-sm text-gray-300">Better Buying</p>

              <p className="text-sm text-gray-300">Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
