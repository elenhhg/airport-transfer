"use client";

import { useState } from "react";
import { Bus, Home, Calendar, Truck, Phone, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Booking", href: "/booking", icon: Calendar },
    { label: "Fleet", href: "/fleet", icon: Truck },
    { label: "Contact", href: "/contact", icon: Phone },
  ];

  // Motion variants για tooltips με stagger
  const tooltipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 h-24"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 z-50">
        <motion.div
          className="p-2 rounded-lg bg-gray-100"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Bus className="h-6 w-6 text-gray-900" />
        </motion.div>
        <span className="font-bold text-xl text-gray-900 tracking-tight">
          AirportExpress
        </span>
      </Link>

      {/* Centered Icons with Tooltips */}
      <motion.nav
        className="hidden md:flex items-center gap-12 absolute left-1/2 transform -translate-x-1/2 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {navItems.map((item, idx) => (
          <div key={item.label} className="relative flex flex-col items-center group cursor-pointer">
            <Link href={item.href} className="flex flex-col items-center z-50">
              <item.icon className="h-6 w-6 text-gray-800 group-hover:text-gray-900 transition-colors" />
            </Link>

            {/* Tooltip με stagger */}
            <motion.span
              className="absolute -top-6 px-2 py-1 text-xs rounded bg-gray-900 text-white pointer-events-none whitespace-nowrap"
              variants={tooltipVariants}
              initial="hidden"
              whileHover="visible"
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: idx * 0.05 }}
            >
              {item.label}
            </motion.span>
          </div>
        ))}
      </motion.nav>

      {/* Book Now Button */}
<div className="hidden md:flex z-50">
  <Link href="/booking">
    <motion.button
      className="w-full px-8 py-4 rounded-full text-black font-bold text-lg shadow-lg grey-gradient from-primary to-secondary hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-300"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      Book Now
    </motion.button>
  </Link>
</div>


      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden p-2 rounded hover:bg-gray-100 transition-colors z-50"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            className="md:hidden bg-white shadow-md absolute top-24 left-0 w-full z-40"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-900 font-medium py-2 hover:text-gray-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}

              {/* Mobile Book Now */}
              <Link href="/booking">
                <motion.button
                  className="w-full mt-2 px-5 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Now
                </motion.button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
