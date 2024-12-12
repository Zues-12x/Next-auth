import { db } from "@/lib/db"

export const getResetTokenByEmail = async (email) => {
    try {
        const resetToken = await db.passwordResetToken.findFirst({
            where: { email }
        })

        return resetToken
    } catch (error) {
        return null
    }
}

export const getResetTokenByToken = async (token) => {
    try {
        const resetToken = await db.passwordResetToken.findUnique({
            where: { token }
        })

        return resetToken
    } catch (error) {
        return null
    }
}