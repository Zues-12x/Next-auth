"use server"

import { auth } from "@/auth"
import { getUserbyEmail, getUserbyId } from "@/data/user"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"

const { SettingsSchema } = require("@/schemas")

export const settings = async (values) => {

    const { user } = await auth()

    if (!user) {
        return { error: "Unauthorized User" }
    }

    const existingUser = await getUserbyId(user.id)
    if (!existingUser) {
        return { error: "Unauthorized User" }
    }

    if (user.isOAuth) {
        values.email = undefined
        values.isTwoFactorEnabled = undefined
    }

    if (values.email && values.email !== user.email) {
        const existingEmail = await getUserbyEmail(values.email);

        if (existingEmail) {
            return { error: "Email already exists" }
        }

        const verificationToken = await generateVerificationToken(values.email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token);

        return { success: "Verfication email send" }
    }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            ...values
        }
    })

    return { success: "Settings Updated!" }

}