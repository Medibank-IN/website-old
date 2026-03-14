import { NextResponse } from "next/server";

import { verifyOtpSession } from "@/lib/server/otpStore";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const payload = await request.json();
    const response = verifyOtpSession(payload.mobile, payload.otp);

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
