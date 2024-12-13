"use server";

import { auth } from "@/auth";

export async function admin() {
    const { user } = await auth();

    if (user.role === "ADMIN") {
        return { success: "OK" }
    }
    return { error: "NotOK" }
}