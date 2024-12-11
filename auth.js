import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserbyId } from "./data/user"

export const { auth, handlers, signIn, signOut } = NextAuth({
    callbacks: {
        async session({ token, session }) {
            if (session.user && token.role) {
                session.user.role = token.role;
            }
            return session
        },
        // async signIn({ user }) {
        //     const existingUser = await getUserbyId(user.id);
        //     if (!existingUser || !existingUser.isVerified) {
        //         return false;
        //     }
        //     return true;
        // },
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