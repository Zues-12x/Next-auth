"use server"
import { AuthError } from "next-auth"
import bcryptjs from 'bcryptjs'

import { signIn } from "@/auth"
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken"
import { getUserbyEmail } from "@/data/user"
import { db } from "@/lib/db"
import { sendTwoFactorEmail, sendVerificationEmail } from "@/lib/mail"
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation"

export const login = async (values) => {

    // await new Promise(resolve => setTimeout(() => resolve(console.log("object")), 4000));

    const validateFields = LoginSchema.safeParse
        (values)
    if (!validateFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password, code } = validateFields.data;

    try {

        const existingUser = await getUserbyEmail(email);

        if (!existingUser || !existingUser.email || !existingUser.password) {
            return { error: " Email does not exist" }
        }

        if (!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(existingUser.email)

            await sendVerificationEmail(verificationToken.email, verificationToken.token)

            return { success: "Verification email sent (verify account to login)" }
        }


        if (existingUser.isTwoFactorEnabled && existingUser.email) {

            const passwordsMatch = await bcryptjs.compare(password, existingUser.password)
            if (!passwordsMatch) return { error: "Invalid credentials" }

            if (code) {
                const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

                if (!twoFactorToken) {
                    return { error: "Invalid Code" }
                }
                if (!(twoFactorToken.token === code)) {
                    return { error: "Invalid Code" }
                }

                const hasExpired = new Date(twoFactorToken.expires) < new Date()

                if (hasExpired) {
                    return { error: "Expired Code" }
                }

                await db.twoFactorToken.delete({
                    where: {
                        id: twoFactorToken.id
                    }
                })

                const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                if (existingConfirmation) {
                    await db.twoFactorConfirmation.delete({
                        where: {
                            id: existingConfirmation.id
                        }
                    })
                }

                await db.twoFactorConfirmation.create({
                    data: {
                        userId: existingUser.id,
                    }
                })
            }

            else {

                const twoFactorToken = await generateTwoFactorToken(existingUser.email)

                await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token)
                return { twoFactor: true }
            }
        }

        await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials!" }
                default:
                    return { error: "Login Unsuccessful! Something went wrong" }
            }
        }
        throw error;
    }
}