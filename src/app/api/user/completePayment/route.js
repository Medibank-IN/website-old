import { NextResponse } from "next/server";

import { completeUserPayment } from "@/lib/server/userService";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const payload = await request.json();
    const response = await completeUserPayment(payload);

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
