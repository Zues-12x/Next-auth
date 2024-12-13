import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserbyId } from "./data/user"
import { getTwoFactorConfirmationByUserId } from "./data/twoFactorConfirmation"

export const { auth, handlers, signIn, signOut } = NextAuth({
    page: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async session({ token, session }) {
            if (session.user && token.role) {
                session.user.role = token.role;
            }
            return session
        },
        async signIn({ user, account }) {

            if (account?.provider !== "credentials") return true

            const existingUser = await getUserbyId(user.id);

            if (!existingUser || !existingUser?.emailVerified) return false;

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmed = await getTwoFactorConfirmationByUserId(existingUser.id)

                if (!twoFactorConfirmed) {
                    return false;
                }

                await db.twoFactorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmed.id
                    }
                })
            }
            return true;
        },
        async jwt({ token }) {
            if (token.sub) {
                const existingUser = await getUserbyId(token.sub);
                if (!existingUser) {
                    return token
                }
                token.role = existingUser.role
            }
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})