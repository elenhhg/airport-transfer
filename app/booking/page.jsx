"use client";

import { useState } from "react";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Car,
  User,
  Mail,
  Phone,
  Check,
} from "lucide-react";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    date: "",
    time: "",
    passengers: "1",
    vehicleType: "",
    name: "",
    email: "",
    phone: "",
  });

  const handleNext = () => { if (step < 3) setStep(step + 1); };
  const handleBack = () => { if (step > 1) setStep(step - 1); };
  const handleSubmit = (e) => { e.preventDefault(); console.log(formData); };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Page Header */}
          <div className="text-center mb-12 text-gray-900">
            
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Book Your Transfer
          </h2>
            <p className="text-lg text-gray-600">Complete your booking in 3 easy steps</p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    step >= num
                      ? "bg-gray-300 border-gray-400 text-gray-900"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {step > num ? <Check className="h-5 w-5" /> : num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 transition-all ${
                      step > num ? "bg-gray-300" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Booking Card */}
          <Card className="border border-gray-200 bg-gray-50 text-gray-900 transition-shadow hover:shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Step 1: Trip Details */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold mb-2">Trip Details</h2>
                      <p className="text-sm text-gray-500">Where and when do you need a ride?</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { id: "pickup", icon: MapPin, label: "Pickup Location", placeholder: "e.g., JFK Airport Terminal 4", value: formData.pickupLocation, key: "pickupLocation" },
                        { id: "dropoff", icon: MapPin, label: "Drop-off Location", placeholder: "e.g., Hilton Midtown", value: formData.dropoffLocation, key: "dropoffLocation" },
                        { id: "date", icon: Calendar, label: "Date", placeholder: "", type: "date", value: formData.date, key: "date" },
                        { id: "time", icon: Clock, label: "Time", placeholder: "", type: "time", value: formData.time, key: "time" },
                      ].map((input) => (
                        <div className="space-y-2" key={input.id}>
                          <Label htmlFor={input.id} className="flex items-center gap-2 text-gray-900">
                            <input.icon className="h-4 w-4 text-gray-400" />
                            {input.label}
                          </Label>
                          <Input
                            id={input.id}
                            type={input.type || "text"}
                            placeholder={input.placeholder}
                            value={input.value}
                            onChange={(e) => setFormData({ ...formData, [input.key]: e.target.value })}
                            className="bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-0 focus:border-gray-400"
                            required
                          />
                        </div>
                      ))}

                      {/* Passengers */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="passengers" className="flex items-center gap-2 text-gray-900">
                          <Users className="h-4 w-4 text-gray-400" />
                          Number of Passengers
                        </Label>
                        <Select
                          value={formData.passengers}
                          onValueChange={(value) => setFormData({ ...formData, passengers: value })}
                        >
                          <SelectTrigger className="bg-white border border-gray-300 text-gray-900 focus:border-gray-400">
                            <SelectValue placeholder="Select passengers" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-gray-900 border border-gray-300">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem key={num} value={num.toString()} className="text-gray-900">
                                {num} {num === 1 ? "Passenger" : "Passengers"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Vehicle Selection */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold mb-2">Choose Your Vehicle</h2>
                      <p className="text-sm text-gray-500">Select the perfect ride for your journey</p>
                    </div>

                    <div className="grid gap-4">
                      {[
                        { name: "Standard Van", capacity: "Up to 6 passengers", price: "$75", value: "standard" },
                        { name: "Executive Van", capacity: "Up to 8 passengers", price: "$95", value: "executive" },
                        { name: "Luxury Sprinter", capacity: "Up to 16 passengers", price: "$150", value: "luxury" },
                      ].map((vehicle) => (
                        <Card
                          key={vehicle.value}
                          className={`cursor-pointer transition-all border border-gray-300 ${
                            formData.vehicleType === vehicle.value ? "border-gray-400 bg-gray-100" : "bg-white"
                          }`}
                          onClick={() => setFormData({ ...formData, vehicleType: vehicle.value })}
                        >
                          <CardContent className="p-6 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="p-3 rounded-lg bg-gray-100">
                                <Car className="h-6 w-6 text-gray-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">{vehicle.name}</h3>
                                <p className="text-sm text-gray-500">{vehicle.capacity}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-700">{vehicle.price}</p>
                              <p className="text-xs text-gray-500">Fixed price</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Info */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold mb-2">Contact Information</h2>
                      <p className="text-sm text-gray-500">How can we reach you?</p>
                    </div>

                    {[{ id: "name", icon: User, placeholder: "John Doe", key: "name", type: "text" },
                      { id: "email", icon: Mail, placeholder: "john@example.com", key: "email", type: "email" },
                      { id: "phone", icon: Phone, placeholder: "+1 (555) 000-0000", key: "phone", type: "tel" },
                    ].map((input) => (
                      <div className="space-y-2" key={input.id}>
                        <Label htmlFor={input.id} className="flex items-center gap-2 text-gray-900">
                          <input.icon className="h-4 w-4 text-gray-400" />
                          {input.id === "phone" ? "Phone Number" : input.id === "name" ? "Full Name" : "Email Address"}
                        </Label>
                        <Input
                          id={input.id}
                          type={input.type}
                          placeholder={input.placeholder}
                          value={formData[input.key]}
                          onChange={(e) => setFormData({ ...formData, [input.key]: e.target.value })}
                          className="bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-0 focus:border-gray-400"
                          required
                        />
                      </div>
                    ))}

                    {/* Booking Summary */}
                    <Card className="bg-gray-50 border border-gray-300 text-gray-900">
                      <CardContent className="pt-6 text-sm">
                        <h3 className="font-semibold mb-4">Booking Summary</h3>
                        <div className="space-y-2">
                          {[{ label: "From:", value: formData.pickupLocation },
                            { label: "To:", value: formData.dropoffLocation },
                            { label: "Date & Time:", value: formData.date && formData.time ? `${formData.date} at ${formData.time}` : "Not set" },
                            { label: "Passengers:", value: formData.passengers },
                            { label: "Vehicle:", value: formData.vehicleType || "Not selected" },
                          ].map((item) => (
                            <div className="flex justify-between" key={item.label}>
                              <span className="text-gray-500">{item.label}</span>
                              <span className="font-medium">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 mt-8">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={handleBack} className="flex-1 bg-white text-gray-900 border-gray-300 hover:border-gray-400 hover:text-gray-700">Back</Button>
                  )}
                  {step < 3 ? (
                    <Button type="button" onClick={handleNext} className=" grey-gradient from-primary to-secondary">Continue</Button>
                  ) : (
                    <Button type="submit" className="flex-1 grey-gradient from-primary to-secondary">Confirm Transfer</Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
