"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, MapPin, Users, Clock } from "lucide-react"

export function BookingForm() {
  const [formData, setFormData] = useState({
    pickupLocation: "",
    dropoffLocation: "",
    date: "",
    time: "",
    passengers: "1",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Booking submitted:", formData)
    // Handle booking logic here
  }

  return (
    <section id="booking" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-2">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Book Your Shuttle</CardTitle>
            <CardDescription className="text-base">
              Reserve your comfortable ride in just a few clicks
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="pickup" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Pickup Location
                  </Label>
                  <Input
                    id="pickup"
                    placeholder="e.g., JFK Airport Terminal 4"
                    value={formData.pickupLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, pickupLocation: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dropoff" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Dropoff Location
                  </Label>
                  <Input
                    id="dropoff"
                    placeholder="e.g., Hilton Midtown"
                    value={formData.dropoffLocation}
                    onChange={(e) =>
                      setFormData({ ...formData, dropoffLocation: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passengers" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Passengers
                  </Label>
                  <Input
                    id="passengers"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Check Availability & Book
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
