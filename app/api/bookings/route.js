import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/booking";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      pickupLocation,
      dropoffLocation,
      date,
      time,
      passengers,
      vehicleType,
      name,
      email,
      phone,
      distanceKm,
      price,
    } = body;

    // ✅ Έλεγχος required fields
    if (!pickupLocation || !dropoffLocation || !date || !time || !passengers) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Σύνδεση με MongoDB
    await connectDB();

    // ✅ Δημιουργία κράτησης (ίδια ονόματα με το schema)
    const booking = await Booking.create({
      pickupLocation,
      dropoffLocation,
      date,
      time,
      passengers,
      vehicleType,
      name,
      email,
      phone,
      distanceKm,
      price,
    });

    // ✅ Ρύθμιση μεταφορέα email (Nodemailer)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Αποστολή email ειδοποίησης
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "🚗 New Transfer Booking",
      text: `
New booking received:

Pickup: ${pickupLocation}
Dropoff: ${dropoffLocation}
Date: ${date}
Time: ${time}
Passengers: ${passengers}
Vehicle: ${vehicleType || "Not selected"}
Name: ${name}
Email: ${email}
Phone: ${phone}
Distance: ${distanceKm || "N/A"} km
Price: ${price ? `€${price}` : "N/A"}
      `,
    });

    return NextResponse.json({ success: true, booking });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
