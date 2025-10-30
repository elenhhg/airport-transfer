"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Clock, Shield, DollarSign, HeadphonesIcon } from "lucide-react";

const features = [
  { 
    icon: Clock, 
    title: "On Time", 
    description: "Enjoy punctual pickups with real-time flight monitoring and GPS tracking, ensuring you always arrive on schedule." 
  },
  { 
    icon: Shield, 
    title: "Licensed Drivers", 
    description: "Our professional drivers are fully licensed, background-checked, and trained for your safety and comfort." 
  },
  { 
    icon: DollarSign, 
    title: "Fixed Prices", 
    description: "Transparent, upfront pricing with no hidden fees, surge charges, or unexpected costs—ever." 
  },
  { 
    icon: HeadphonesIcon, 
    title: "24/7 Support", 
    description: "Our dedicated customer service team is available around the clock to assist you with bookings or inquiries." 
  },
];

export function Features() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className="relative py-28 px-6 bg-white flex flex-col items-center">
      {/* Section Title */}
      <motion.h2
        className="text-5xl font-extrabold text-gray-900 mb-28 text-center"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]),
          y: useTransform(scrollYProgress, [0, 0.1], [50, 0])
        }}
      >
        Why Choose Us
      </motion.h2>

      <div className="relative w-full max-w-5xl">
        {/* Middle Line */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[2px] bg-gray-200 -translate-x-1/2" />

        {/* Features */}
        <div className="flex flex-col gap-20 w-full">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isLeft = idx % 2 === 0;
            const start = 0.1 + idx * 0.1;
            const end = start + 0.2;
            const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
            const y = useTransform(scrollYProgress, [start, end], [50, 0]);

            return (
              <motion.div
                key={feature.title}
                className="relative w-full flex justify-center"
                style={{ opacity, y }}
              >
                <div
                  className={`flex items-center gap-6 flex-col md:flex-row w-full ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Icon */}
                  <motion.div
                    className="flex items-center justify-center bg-gray-900 text-white h-16 w-16 rounded-full shadow-lg flex-shrink-0 relative z-10"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="h-8 w-8" />
                  </motion.div>

                  {/* Content */}
                  <div className="bg-gray-50 p-6 rounded-2xl shadow-md text-center md:text-left max-w-xs">
                    <h3 className="text-2xl font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 mt-2">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
