import { getVerificationTokenByEmail } from "@/data/verificationToken";
const { v4: uuidv4 } = require('uuid');
import { db } from "./db";
import { getResetTokenByEmail } from "@/data/resetToken";


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