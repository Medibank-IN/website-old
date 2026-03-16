import { NextResponse } from "next/server";

import { createEmailOtpSession } from "@/lib/server/otpStore";
import { sendEmailOtpMail } from "@/lib/server/emailOtpService";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const payload = await request.json();
    const session = createEmailOtpSession(payload.email);

    if (!session.success) {
      return NextResponse.json(session, { status: 400 });
    }

    await sendEmailOtpMail({ email: session.email, otp: session.otp });

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully.",
      data: {
        email: session.email,
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
