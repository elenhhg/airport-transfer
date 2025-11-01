"use client"; // απαραίτητο

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(true), []);

  const { scrollYProgress } = useScroll();
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const scrollY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

  const fadeUp = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

  const featuresList = [
    { icon: MapPin, title: "Door-to-Door Pickup", description: "From airport to hotel, enjoy seamless door-to-door service." },
    { icon: Calendar, title: "Flexible Scheduling", description: "Book in advance or last-minute, anytime, 24/7." },
    { icon: ArrowRight, title: "Premium Vehicles", description: "Travel comfortably in luxury vehicles with professional drivers." },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center px-6 md:px-12 py-40 md:py-48 bg-no-repeat bg-center bg-contain" style={{ backgroundImage: "url('/images/logo.png')" }}>
      <motion.div className="relative text-center max-w-3xl w-full" style={{ opacity: scrollOpacity, y: scrollY }} variants={container} initial="hidden" animate={loaded ? "visible" : "hidden"}>
        <motion.h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6" variants={fadeUp}>Airport Transfers Simplified</motion.h1>
        <motion.p className="text-base md:text-lg text-gray-700 mb-10 leading-relaxed" variants={fadeUp}>Effortless, comfortable, and reliable rides with professional drivers and luxury vehicles, available 24/7. Book your airport transfer in seconds and travel stress-free.</motion.p>

        <motion.div className="flex flex-col sm:flex-row justify-center gap-5 mt-6" variants={fadeUp}>
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
        </motion.div>
      </motion.div>

      <motion.div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl" style={{ opacity: scrollOpacity, y: scrollY }} variants={container} initial="hidden" animate={loaded ? "visible" : "hidden"}>
        {featuresList.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div key={idx} className="p-6 bg-white/50 rounded-xl text-center shadow-md hover:shadow-xl transition-shadow duration-300" variants={fadeUp}>
              <Icon className="mx-auto mb-4 h-8 w-8 text-gray-700" />
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
