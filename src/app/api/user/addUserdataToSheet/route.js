import { NextResponse } from "next/server";

import { addUserData } from "@/lib/server/userService";

export const runtime = "nodejs";

export async function POST(request) {
	try {
		const payload = await request.json();
		const response = await addUserData(payload);
		return NextResponse.json(response, { status: 200 });
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
