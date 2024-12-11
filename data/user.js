const { db } = require("@/lib/db")

export const getUserbyEmail = async (email) => {
    try {
        const user = await db.user.findUnique({ where: { email } })
        return user;
    } catch (error) {
        return null;
    }
}
export const getUserbyId = async (id) => {
    try {
        const user = await db.user.findUnique({ where: { id } })
        return user;
    } catch (error) {
        return null;
    }
}