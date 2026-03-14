import { NextResponse } from "next/server";

import { addUserData } from "@/lib/server/userService";
import { consumeVerifiedMobile } from "@/lib/server/otpStore";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const payload = await request.json();

    const mobileVerified = consumeVerifiedMobile(payload.mobile);
    if (!mobileVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Please verify your mobile number with OTP before continuing.",
        },
        { status: 400 }
      );
    }

    const response = await addUserData(payload);

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
