"use client";

import { Bus, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  const iconHover = { scale: 1.2, transition: { duration: 0.3 } };
  const linkHover = { scale: 1.05, transition: { duration: 0.3 } };

  return (
    <footer className="bg-white py-20 px-6 text-gray-800">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <motion.div whileHover={iconHover} className="flex items-center gap-2">
              <Bus className="h-6 w-6 text-gray-600" />
              <span className="font-bold text-lg text-gray-800">AirportExpress</span>
            </motion.div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your trusted partner for premium airport shuttle services.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4">
              <motion.a href="#" whileHover={iconHover} className="cursor-pointer">
                <Instagram className="h-5 w-5 text-gray-600" />
              </motion.a>
              <motion.a href="#" whileHover={iconHover} className="cursor-pointer">
                <Facebook className="h-5 w-5 text-gray-600" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-gray-800">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {["Book Now", "Services", "How It Works", "FAQ"].map((item) => (
                <motion.li
                  key={item}
                  whileHover={linkHover}
                  className="hover:text-gray-800 cursor-pointer transition-colors duration-300"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-gray-800">Services</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {["Airport Transfers", "Hotel Shuttles", "Group Transportation", "Corporate Services"].map((item) => (
                <motion.li
                  key={item}
                  whileHover={linkHover}
                  className="hover:text-gray-800 cursor-pointer transition-colors duration-300"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-gray-800">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <motion.li whileHover={iconHover} className="flex items-center gap-2 cursor-pointer transition-all duration-300">
                <Phone className="h-4 w-4 text-gray-600" />
                <span>+1 (555) 123-4567</span>
              </motion.li>
              <motion.li whileHover={iconHover} className="flex items-center gap-2 cursor-pointer transition-all duration-300">
                <Mail className="h-4 w-4 text-gray-600" />
                <span>info@airportexpress.com</span>
              </motion.li>
              <motion.li whileHover={iconHover} className="flex items-center gap-2 cursor-pointer transition-all duration-300">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span>New York, NY</span>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>
            &copy; 2025 <span className="text-gray-700 font-medium">AirportExpress</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
