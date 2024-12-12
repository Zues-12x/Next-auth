"use server"

import { db } from "@/lib/db";
import { getUserbyEmail } from "@/data/user";
import { ResetSchema } from "@/schemas";
import { generateResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";


export const reset = async (values) => {

    const validateFields = ResetSchema.safeParse
        (values)
    if (!validateFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email } = validateFields.data;

    const existingUser = await getUserbyEmail(email);

    if (!existingUser) return { error: "No account exists against this email" }

    const resetToken = await generateResetToken(email);

    await sendPasswordResetEmail(resetToken.email, resetToken.token);

    return { success: "Reset email sent, check your email" }
}