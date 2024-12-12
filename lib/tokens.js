import { getTwoFactorTokenByEmail, } from "@/data/twoFactorToken";
const { v4: uuidv4 } = require('uuid');
import { db } from "./db";
import { getResetTokenByEmail } from "@/data/resetToken";
import crypto from "crypto"

export const generateTwoFactorToken = async (email) => {
    const token = crypto.randomInt(100000, 1000000).toString()
    const expires = new Date(Date.now() + 3600 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if (existingToken) {
        await db.twoFactorToken.delete({
            where: { id: existingToken.id }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return twoFactorToken;
}

export const generateVerificationToken = async (email) => {
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: { id: existingToken.id }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return verificationToken
}

export const generateResetToken = async (email) => {
    const token = uuidv4();
    const expires = new Date(Date.now() + 3600 * 1000);

    const existingToken = await getResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: { id: existingToken.id }
        })
    }

    const resetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return resetToken;
}


