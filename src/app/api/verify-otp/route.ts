import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import mongoose from "mongoose"

export async function POST(req: Request) {
  try {
    let body
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
    }

    const { email, otp } = body

    if (!email || typeof email !== "string") {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 })
    }

    if (!otp || typeof otp !== "string") {
      return NextResponse.json({ success: false, error: "OTP is required" }, { status: 400 })
    }

    await dbConnect()
    const otpCollection = mongoose.connection.db!.collection("otps")
    const storedOtpData = await otpCollection.findOne({ email })

    if (!storedOtpData || storedOtpData.otp !== otp) {
      return NextResponse.json({ success: false, error: "Invalid OTP" }, { status: 400 })
    }

    if (Date.now() > storedOtpData.expires) {
      return NextResponse.json({ success: false, error: "OTP has expired" }, { status: 400 })
    }

    await otpCollection.deleteOne({ email })

    return NextResponse.json({ success: true, message: "OTP verified successfully" })
  } catch (error) {
    console.error("Error in verifying OTP:", error)
    return NextResponse.json({ success: false, error: "Failed to verify OTP" }, { status: 500 })
  }
}
