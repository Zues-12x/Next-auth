"use server"
import { db } from "@/lib/db";
import bcryptjs from "bcryptjs";


import { getResetTokenByToken } from "@/data/resetToken";
import { getUserbyEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";

export const newPassword = async (values, token) => {

    if (!token) {
        return { error: "Missing token!" }
    }

    const validateFields = NewPasswordSchema.safeParse(values)
    if (!validateFields.success) {
        return { error: "Invalid fields!" }
    }

    const { password } = validateFields.data;

    const existingToken = await getResetTokenByToken(token)

    if (!existingToken) {
        return { error: "Invalid reset token" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) return { error: "Token expired, get a new token" }

    const existingUser = await getUserbyEmail(existingToken.email);

    if (!existingUser) return { error: "Email could not be found for this token" }

    const hashedPassword = await bcryptjs.hash(password, 10)


    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    })

    await db.passwordResetToken.delete({
        where: {
            id: existingToken.id
        },
    })

    return { success: "Password changed successfully" }

}