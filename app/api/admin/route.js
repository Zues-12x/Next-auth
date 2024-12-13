import { auth } from "@/auth";
import { NextResponse } from "next/server";


export async function GET() {
    const { user } = await auth();

    if (user.role === "ADMIN") {
        return new NextResponse({ message: "Admin hi ha" }, { status: 200 })
    }
    return new NextResponse(null, { status: 403 })


}