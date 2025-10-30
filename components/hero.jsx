"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar, Plane } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Fade out and move up on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25], [0, -50]); // πιο κάτω κινούμενο

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center px-6 md:px-12 py-40 md:py-48 bg-no-repeat bg-center bg-contain"
      style={{ backgroundImage: "url('/images/logo.png')" }} // Αντικατάστησε με τη διαδρομή της εικόνας σου
    >
      {/* Hero Icon + Title */}
      <motion.div
        className="relative text-center max-w-3xl w-full"
        style={{ opacity, y }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Airport Transfers Simplified
        </h1>

        <p className="text-base md:text-lg text-gray-700 mb-10 leading-relaxed">
          Effortless, comfortable, and reliable rides with professional drivers
          and luxury vehicles, available 24/7. Book your airport transfer in
          seconds and travel stress-free.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-6">
          <Link href="/booking">
            <Button className="flex items-center gap-2 bg-gradient-to-b from-gray-200 to-gray-300 text-gray-900 font-bold text-lg px-10 py-5 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300">
              Book a Ride
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>

          <Link href="/fleet">
            <Button className="flex items-center justify-center bg-gradient-to-b from-gray-300 to-gray-300 text-gray-900 font-semibold text-lg px-10 py-5 rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
              View Fleet
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Booking Form */}
      <motion.div
        className="relative mt-28 md:mt-32 w-full max-w-5xl"
        style={{ opacity, y }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: MapPin, label: "Pickup", placeholder: "Airport" },
            { icon: MapPin, label: "Drop-off", placeholder: "Hotel" },
            { icon: Calendar, label: "Date & Time", placeholder: "Select" },
          ].map((field) => (
            <div
              key={field.label}
              className="flex items-center gap-3 p-4 rounded-lg bg-gray-100/10"
            >
              <field.icon className="h-5 w-5 text-gray-700" />
              <div className="flex-1">
                <label className="text-xs text-gray-600 font-medium">
                  {field.label}
                </label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  className="w-full bg-transparent border-none text-gray-900 placeholder:text-gray-500 focus:outline-none text-sm"
                />
              </div>
            </div>
          ))}

          <Button className="grey-gradient from-primary to-secondary">
            Search Rides
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
