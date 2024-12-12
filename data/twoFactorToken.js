const { db } = require("@/lib/db");

export const getTwoFactorTokenByEmail = async (email) => {
    try {
        const verificationToken = await db.twoFactorToken.findFirst({
            where: { email }
        })

        return verificationToken
    } catch (error) {
        return null
    }
}

export const getTwoFactorTokenByToken = async (token) => {
    try {
        const verificationToken = await db.twoFactorToken.findUnique({
            where: { token }
        })

        return verificationToken
    } catch (error) {
        return null
    }
}
