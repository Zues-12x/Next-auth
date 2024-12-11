"use server"

import { getUserbyEmail } from "@/data/user";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import bcryptjs from "bcryptjs";

export const register = async (values) => {

    // await new Promise(resolve => setTimeout(() => resolve(console.log("object")), 4000));

    const validateFields = RegisterSchema.safeParse
        (values)
    if (!validateFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password, name } = validateFields.data;
    const hashedPassword = await bcryptjs.hash(password, 10)

    const existingUser = await getUserbyEmail(email)

    if (existingUser) { return { error: "User already exists!" } }

    await db.user.create({
        data: {
            name, email, password: hashedPassword
        }
    });

    // todo verification token

    return { success: "Email sent!" }
}