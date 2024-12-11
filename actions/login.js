"use server"

import { LoginSchema } from "@/schemas"

export const login = async (values) => {

    // await new Promise(resolve => setTimeout(() => resolve(console.log("object")), 4000));

    const validateFields = LoginSchema.safeParse
        (values)
    if (!validateFields.success) {
        return { error: "Invalid fields!" }
    }

    return { success: "Email sent!" }
}