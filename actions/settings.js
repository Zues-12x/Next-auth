"use server"

import { auth } from "@/auth"
import { getUserbyId } from "@/data/user"
import { db } from "@/lib/db"

const { SettingsSchema } = require("@/schemas")

export const settings = async (values) => {

    const { user } = await auth()

    if (!user) {
        return { error: "Unauthorized User" }
    }

    const existingUser = await getUserbyId(user.id)
    if (!existingUser) {
        return { error: "Unauthorized User" }
    }

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            ...values
        }
    })

    return { success: "Settings Updated!" }

}