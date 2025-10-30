"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DarkLoaderLuxury() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="luxury-loader"
          className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black to-[#0c0c0c] text-white z-[9999] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Subtle silver glow behind logo */}
          <motion.div
            className="absolute w-[300px] h-[300px] bg-gradient-to-r from-[#dcdcdc]/20 via-[#c0c0c0]/20 to-[#ffffff]/20 blur-[100px] rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 1.5 }}
          />

          {/* Logo text */}
          <motion.div
            className="text-4xl md:text-5xl font-light tracking-[0.3em] mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            AIRPORT<span className="text-[#c0c0c0] font-medium">EXPRESS</span>
          </motion.div>

          {/* Elegant line under logo */}
          <motion.div
            className="h-[1px] w-44 bg-gradient-to-r from-transparent via-[#bdb343] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
          />

          {/* Tagline */}
          <motion.p
            className="mt-8 text-sm text-gray-400 tracking-[0.25em] uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            Preparing your experience...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
