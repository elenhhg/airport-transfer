import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    passengers: { type: Number, required: true },
    vehicleType: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    distanceKm: { type: Number }, // Προαιρετικό
    price: { type: Number },      // Προαιρετικό
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
