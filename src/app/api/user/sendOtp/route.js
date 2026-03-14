import { NextResponse } from "next/server";

import { createOtpSession } from "@/lib/server/otpStore";
import { sendOtpSms } from "@/lib/server/smsCountryService";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const payload = await request.json();
    const session = createOtpSession(payload.mobile);

    if (!session.success) {
      return NextResponse.json(session, { status: 400 });
    }

    await sendOtpSms({ mobile: session.mobile, otp: session.otp });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully.",
      data: {
        mobile: session.mobile,
        expiresInSeconds: session.expiresInSeconds,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Unable to send OTP.",
      },
      { status: 500 }
    );
  }
}
