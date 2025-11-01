"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Calendar,
  Clock,
  Car,
  User,
  Mail,
  Phone,
  Check,
} from "lucide-react";

import PassengerSelector from "@/components/passenger";

const LocationAutocomplete = dynamic(() => import("@/components/autocomplete"), {
  ssr: false,
});

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    date: "",
    time: "",
    passengers: 1,
    vehicleType: "",
    name: "",
    email: "",
    phone: "",
  });

  const [pickupLatLon, setPickupLatLon] = useState(null);
  const [dropoffLatLon, setDropoffLatLon] = useState(null);
  const [distanceKm, setDistanceKm] = useState(null);
  const [price, setPrice] = useState(null);

  // ✅ Υπολογισμός απόστασης & τιμής
  useEffect(() => {
    if (pickupLatLon && dropoffLatLon) {
      const toRad = (v) => (v * Math.PI) / 180;
      const [lat1, lon1] = pickupLatLon;
      const [lat2, lon2] = dropoffLatLon;
      const R = 6371; // km
      const dLat = toRad(lat2 - lat1);
      const dLon = toRad(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = R * c;
      setDistanceKm(dist.toFixed(1));

      const base = 50;
      const perKm = 1.5;
      const calculatedPrice = Number((base + perKm * dist).toFixed(2));
      setPrice(calculatedPrice); // ✅ Αριθμός, όχι string
    }
  }, [pickupLatLon, dropoffLatLon]);

  // ✅ Buttons για επόμενο / προηγούμενο βήμα
  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  // ✅ Υποβολή κράτησης
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const numericPrice = price ? Number(price) : null;

      const bookingData = {
        pickupLocation: formData.pickupLocation,
        dropoffLocation: formData.dropoffLocation,
        date: formData.date,
        time: formData.time,
        passengers: formData.passengers,
        vehicleType: formData.vehicleType,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        distanceKm: Number(distanceKm),
        price: numericPrice,
      };

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit booking");

      console.log("✅ Booking saved:", data.booking);
      setSuccessModal(true);
    } catch (error) {
      console.error("❌ Failed to submit booking:", error);
      alert("Error submitting booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 text-gray-900">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Book Your Transfer
            </h2>
            <p className="text-lg text-gray-600">
              Complete your booking in 3 easy steps
            </p>
          </div>

          {/* Progress Steps */}
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

          {/* Booking Form */}
          <Card className="border border-gray-200 bg-gray-50 text-gray-900 transition-shadow hover:shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold mb-2">
                        Trip Details
                      </h2>
                      <p className="text-sm text-gray-500">
                        Where and when do you need a ride?
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <LocationAutocomplete
                        id="pickup"
                        label="Pickup Location"
                        value={formData.pickupLocation}
                        onChange={(val) =>
                          setFormData({ ...formData, pickupLocation: val })
                        }
                        setLatLon={setPickupLatLon}
                      />

                      <LocationAutocomplete
                        id="dropoff"
                        label="Drop-off Location"
                        value={formData.dropoffLocation}
                        onChange={(val) =>
                          setFormData({ ...formData, dropoffLocation: val })
                        }
                        setLatLon={setDropoffLatLon}
                      />

                      <div className="space-y-2">
                        <Label htmlFor="date" className="flex items-center gap-2 text-gray-900">
                          <Calendar className="h-4 w-4 text-gray-400" /> Date
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) =>
                            setFormData({ ...formData, date: e.target.value })
                          }
                          className="bg-white border border-gray-300 text-gray-900 focus:border-gray-400"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time" className="flex items-center gap-2 text-gray-900">
                          <Clock className="h-4 w-4 text-gray-400" /> Time
                        </Label>
                        <Input
                          id="time"
                          type="time"
                          value={formData.time}
                          onChange={(e) =>
                            setFormData({ ...formData, time: e.target.value })
                          }
                          className="bg-white border border-gray-300 text-gray-900 focus:border-gray-400"
                          required
                        />
                      </div>

                      <div className="md:col-span-2">
                        <PassengerSelector
                          value={formData.passengers}
                          onChange={(val) =>
                            setFormData({ ...formData, passengers: val })
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold mb-2">
                        Choose Your Vehicle
                      </h2>
                      <p className="text-sm text-gray-500">
                        Select the perfect ride for your journey
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {[
                        {
                          name: "Standard Van",
                          capacity: "Up to 6 passengers",
                          price: "€75",
                          value: "standard",
                        },
                        {
                          name: "Executive Van",
                          capacity: "Up to 8 passengers",
                          price: "€95",
                          value: "executive",
                        },
                        {
                          name: "Luxury Sprinter",
                          capacity: "Up to 16 passengers",
                          price: "€150",
                          value: "luxury",
                        },
                      ].map((vehicle) => (
                        <Card
                          key={vehicle.value}
                          className={`cursor-pointer transition-all border ${
                            formData.vehicleType === vehicle.value
                              ? "border-gray-400 bg-gray-100"
                              : "border-gray-300 bg-white"
                          }`}
                          onClick={() =>
                            setFormData({
                              ...formData,
                              vehicleType: vehicle.value,
                            })
                          }
                        >
                          <CardContent className="p-6 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="p-3 rounded-lg bg-gray-100">
                                <Car className="h-6 w-6 text-gray-400" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-lg">
                                  {vehicle.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {vehicle.capacity}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-700">
                                {vehicle.price}
                              </p>
                              <p className="text-xs text-gray-500">
                                Fixed price
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-semibold mb-2">
                        Contact Information
                      </h2>
                      <p className="text-sm text-gray-500">
                        How can we reach you?
                      </p>
                    </div>

                    {[
                      {
                        id: "name",
                        icon: User,
                        placeholder: "John Doe",
                        key: "name",
                        type: "text",
                      },
                      {
                        id: "email",
                        icon: Mail,
                        placeholder: "john@example.com",
                        key: "email",
                        type: "email",
                      },
                      {
                        id: "phone",
                        icon: Phone,
                        placeholder: "+1 (555) 000-0000",
                        key: "phone",
                        type: "tel",
                      },
                    ].map((input) => (
                      <div className="space-y-2" key={input.id}>
                        <Label
                          htmlFor={input.id}
                          className="flex items-center gap-2 text-gray-900"
                        >
                          <input.icon className="h-4 w-4 text-gray-400" />
                          {input.id === "phone"
                            ? "Phone Number"
                            : input.id === "name"
                            ? "Full Name"
                            : "Email Address"}
                        </Label>
                        <Input
                          id={input.id}
                          type={input.type}
                          placeholder={input.placeholder}
                          value={formData[input.key]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [input.key]: e.target.value,
                            })
                          }
                          className="bg-white border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-400"
                          required
                        />
                      </div>
                    ))}

                    <Card className="bg-gray-50 border border-gray-300 text-gray-900">
                      <CardContent className="pt-6 text-sm">
                        <h3 className="font-semibold mb-4">Booking Summary</h3>
                        <div className="space-y-2">
                          {[
                            { label: "From:", value: formData.pickupLocation },
                            { label: "To:", value: formData.dropoffLocation },
                            {
                              label: "Date & Time:",
                              value:
                                formData.date && formData.time
                                  ? `${formData.date} at ${formData.time}`
                                  : "Not set",
                            },
                            { label: "Passengers:", value: formData.passengers },
                            {
                              label: "Vehicle:",
                              value: formData.vehicleType || "Not selected",
                            },
                            {
                              label: "Distance:",
                              value: distanceKm ? `${distanceKm} km` : "N/A",
                            },
                            {
                              label: "Price:",
                              value: price ? `€${price.toFixed(2)}` : "N/A",
                            },
                          ].map((item) => (
                            <div
                              className="flex justify-between"
                              key={item.label}
                            >
                              <span className="text-gray-500">
                                {item.label}
                              </span>
                              <span className="font-medium">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4 mt-8">
                  {step > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="flex-1 bg-white text-gray-900 border-gray-300 hover:border-gray-400 hover:text-gray-700"
                    >
                      Back
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button type="button" onClick={handleNext}>
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1"
                    >
                      {loading ? "Submitting..." : "Confirm Transfer"}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />

      {/* Success Modal */}
      <Dialog open={successModal} onOpenChange={setSuccessModal}>
        <DialogContent className="bg-white border border-gray-200 text-gray-900 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              ✅ Booking Submitted!
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Your transfer request was successfully received. We will contact
              you soon.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setSuccessModal(false)}
              className="w-full grey-gradient from-primary to-secondary"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
