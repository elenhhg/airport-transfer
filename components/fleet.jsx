"use client";

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Luggage } from "lucide-react"

const vehicles = [
  {
    name: "Mercedes Vito",
    image: "/images/mercedes-vito-luxury-van-exterior.jpg",
    passengers: 6,
    luggage: 6,
    features: ["Wi-Fi", "Climate Control", "USB Charging"],
    price: "$75",
  },
  {
    name: "Mercedes Sprinter",
    image: "/images/mercedes-sprinter-luxury-shuttle-bus.jpg",
    passengers: 16,
    luggage: 16,
    features: ["Wi-Fi", "Reclining Seats", "Entertainment"],
    price: "$150",
  },
  {
    name: "Executive Van",
    image: "/images/executive-luxury-van-interior-leather-seats.jpg",
    passengers: 8,
    luggage: 8,
    features: ["Leather Seats", "Premium Sound", "Privacy Glass"],
    price: "$95",
  },
]

export function FleetSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Ακόμα πιο αργή εξαφάνιση
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -30])

  return (
    <section ref={ref} className="py-28 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Header */}
        <motion.div style={{ opacity, y }}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our Fleet
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Choose from our selection of premium vehicles designed for comfort and style
          </p>
        </motion.div>

        {/* Vehicles */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ opacity, y }}
        >
          {vehicles.map((vehicle, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.3 } }}
              className="bg-gray-50 rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-lg"
            >
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-gray-900">{vehicle.name}</h3>
                <div className="flex items-center gap-4 text-gray-700 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{vehicle.passengers} seats</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Luggage className="w-4 h-4" />
                    <span>{vehicle.luggage} bags</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-gray-700 text-xs">
                  {vehicle.features.map((feature, fIdx) => (
                    <span
                      key={fIdx}
                      className="bg-gray-200 px-2 py-1 rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <span className="font-bold text-gray-900">{vehicle.price}</span>
                  <Button className="bg-gradient-to-b from-gray-200 to-gray-400 text-gray-900 font-semibold px-6 py-3 text-sm rounded-full shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300">
  Book
</Button>

                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Full Fleet Button */}
        <motion.div className="mt-16" style={{ opacity, y }}>
          <Link href="/fleet">
            <Button className=" grey-gradient from-primary to-secondary">View Full Fleet</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
