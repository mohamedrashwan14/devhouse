import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import dbConnect from "@/lib/mongodb"
import mongoose from "mongoose"

export async function POST(req: Request) {
  try {
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.EMAIL_FROM) {
      return NextResponse.json({ success: false, error: "Server configuration error: Email settings not configured" }, { status: 500 })
    }

    let body
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
    }

    const { email } = body

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    await dbConnect()
    const otpCollection = mongoose.connection.db!.collection("otps")

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    await otpCollection.updateOne(
      { email },
      { $set: { otp, expires: Date.now() + 5 * 60 * 1000 } },
      { upsert: true }
    )

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number.parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_PORT === "465",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
    })

    try {
      await Promise.race([
        transporter.verify(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Email verification timeout")), 10000))
      ])
    } catch {
      // Some providers don't support verify(), continue anyway
    }

    await transporter.sendMail({
      from: `"DevHouse" <${process.env.EMAIL_FROM}>`,
      to: email,
      subject: "Your OTP for DevHouse",
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
      html: `<p>Your OTP is: <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
    })

    return NextResponse.json({ success: true, message: "OTP sent successfully" })
  } catch (error) {
    console.error("Error in sending OTP:", error)
    return NextResponse.json({ success: false, error: "Failed to send OTP" }, { status: 500 })
  }
}
