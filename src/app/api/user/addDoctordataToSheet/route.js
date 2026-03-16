import { NextResponse } from "next/server";

import { consumeVerifiedEmail, consumeVerifiedMobile } from "@/lib/server/otpStore";
import { addDoctorData } from "@/lib/server/userService";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const payload = await request.json();

    const mobileVerified = consumeVerifiedMobile(payload.mobile);
    if (!mobileVerified) {
      return NextResponse.json({
        success: false,
        message: "Please verify your mobile number with OTP before continuing.",
      }, { status: 400 });
    }

    const normalizedEmail = String(payload.email || "").trim();
    if (normalizedEmail) {
      const emailVerified = consumeVerifiedEmail(normalizedEmail);
      if (!emailVerified) {
        return NextResponse.json({
          success: false,
          message: "Please verify your email with OTP before continuing, or submit without email.",
        }, { status: 400 });
      }
    }

    const response = await addDoctorData(payload);

    return NextResponse.json(response, {
      status: response.success ? 200 : 400,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
