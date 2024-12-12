"use server"

import { db } from "@/lib/db";
import { getUserbyEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verificationToken";

export const verify = async (token) => {

    const existingToken = await getVerificationTokenByToken(token)

    if (!existingToken) {
        return { error: "Invalid verification token" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) return { error: "Token expired, get a new token" }

    const existingUser = await getUserbyEmail(existingToken.email);

    if (!existingUser) return { error: "Email could not be found for this token" }

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    })
    await db.verificationToken.delete({
        where: {
            id: existingToken.id
        },
    })

    return { success: "Email verified" }
}