"use server"

import { signIn } from "@/auth"
import { getUserbyEmail } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { LoginSchema } from "@/schemas"
import { AuthError } from "next-auth"

export const login = async (values) => {

    // await new Promise(resolve => setTimeout(() => resolve(console.log("object")), 4000));

    const validateFields = LoginSchema.safeParse
        (values)
    if (!validateFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validateFields.data;

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