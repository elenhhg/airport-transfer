import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Luggage } from "lucide-react"
import Link from "next/link"

const vehicles = [
  {
    name: "Mercedes Vito",
    image: "images/mercedes-vito-luxury-van-exterior-white.jpg",
    passengers: 6,
    luggage: 6,
    features: ["Wi-Fi", "Climate Control", "USB Charging", "Leather Seats"],
    category: "Standard",
    description: "Perfect for small groups and families, offering comfort and reliability.",
  },
  {
    name: "Mercedes Sprinter",
    image: "images/mercedes-sprinter-luxury-shuttle-bus-interior.jpg",
    passengers: 16,
    luggage: 16,
    features: ["Wi-Fi", "Reclining Seats", "Entertainment System", "Refreshments"],
    category: "Luxury",
    description: "Ideal for larger groups with premium amenities and spacious interiors.",
  },
  {
    name: "Executive Van",
    image: "images/executive-luxury-van-interior-leather-seats-premiu.jpg",
    passengers: 8,
    luggage: 8,
    features: ["Leather Seats", "Premium Sound", "Privacy Glass", "Mini Bar"],
    category: "Premium",
    description: "Ultimate luxury for business travelers and VIP transportation.",
  },
  {
    name: "Standard Sedan",
    image: "images/luxury-black-sedan-car-exterior.jpg",
    passengers: 3,
    luggage: 3,
    features: ["Wi-Fi", "Climate Control", "USB Charging"],
    category: "Economy",
    description: "Affordable and comfortable option for solo travelers or couples.",
  },
  {
    name: "SUV Premium",
    image: "images/luxury-black-suv-exterior-premium.jpg",
    passengers: 5,
    luggage: 5,
    features: ["Leather Interior", "Panoramic Roof", "Premium Audio", "Wi-Fi"],
    category: "Premium",
    description: "Spacious and stylish for those who want extra comfort and space.",
  },
  {
    name: "Mini Bus",
    image: "images/mini-bus-shuttle-white-exterior-modern.jpg",
    passengers: 24,
    luggage: 24,
    features: ["Air Conditioning", "PA System", "Overhead Storage", "Reclining Seats"],
    category: "Group",
    description: "Perfect for large groups, corporate events, and tour groups.",
  },
]

export default function FleetPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our Premium Fleet
          </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Choose from our selection of meticulously maintained vehicles, each designed to provide the ultimate in
              comfort, safety, and style
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {vehicles.map((vehicle, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-2xl transition-all border-2">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={vehicle.image || "/placeholder.svg"}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    {vehicle.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-2xl mb-2">{vehicle.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{vehicle.description}</p>

                  <div className="flex items-center gap-6 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="font-medium">{vehicle.passengers} seats</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Luggage className="h-5 w-5 text-primary" />
                      <span className="font-medium">{vehicle.luggage} bags</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                      Features
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {vehicle.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link href="/booking">
                    <Button className="w-full grey-gradient from-primary to-secondary">Book This Vehicle</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
