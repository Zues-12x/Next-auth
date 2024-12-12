const { db } = require("@/lib/db");

export const getTwoFactorTokenByToken = async (token) => {
    try {
        const twoFactorToken = await db.verificationToken.findUnique({
            where: { token }
        })

        return twoFactorToken
    } catch (error) {
        return null
    }
}


export const getTwoFactorTokenByEmail = async (email) => {
    try {
        const twoFactorToken = await db.verificationToken.findFirst({
            where: { email }
        })

        return twoFactorToken
    } catch (error) {
        return null
    }
}