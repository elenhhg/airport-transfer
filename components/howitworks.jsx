"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Book Online",
    description:
      "Choose your pickup & dropoff points. Select your date and time, and complete your reservation in seconds.",
  },
  {
    number: "02",
    title: "Get Confirmation",
    description:
      "Receive instant trip confirmation, including your driver details and a live tracking link.",
  },
  {
    number: "03",
    title: "Meet Your Driver",
    description:
      "Your driver awaits you at the pickup point with a personalized sign. Relax and enjoy the ride.",
  },
];

export function HowItWorks() {
  const ref = useRef(null);

  // Scroll-based animation με πιο αργή εξαφάνιση
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Από 1 σε 0 opacity και 0 σε -30px translateY
  // Αλλάζουμε το range [0,0.5] αντί για [0,0.2] για πιο αργή εξαφάνιση
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const sectionY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative py-32 px-6 bg-gradient-to-b from-white via-gray-50 to-white"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div style={{ opacity: sectionOpacity, y: sectionY }} className="text-center mb-28">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light">
            Getting from the airport to your destination has never been easier.
          </p>
        </motion.div>

        {/* Timeline Line */}
        <div className="absolute left-[4.5rem] md:left-[5rem] top-52 bottom-32 w-px bg-gray-200"></div>

        {/* Steps */}
        <motion.div style={{ opacity: sectionOpacity, y: sectionY }} className="space-y-32 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex justify-between items-start md:items-center gap-10 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.25 }}
            >
              {/* Step Number */}
              <div className="flex-shrink-0 relative z-10">
                <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center shadow-sm">
                  <span className="text-gray-700 text-lg font-semibold">{step.number}</span>
                </div>
              </div>

              {/* Step Text */}
              <div className="flex-1 text-right ml-auto max-w-2xl">
                <h3 className="text-gray-900 text-2xl md:text-3xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
