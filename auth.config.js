import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import bcryptjs from "bcryptjs";

import { LoginSchema } from "./schemas"
import { getUserbyEmail } from "./data/user";

export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            profile(profile) {
                console.log("GitHub Profile Response:", profile); // Log the response object
                return {
                    id: profile.id,
                    name: profile.name || profile.login,
                    email: profile.email || null, // Handle missing email
                    image: profile.avatar_url,
                };
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials);

                if (validateFields.success) {
                    const { email, password } = validateFields.data;
                    const user = await getUserbyEmail(email);
                    if (!user || !user.password) {
                        return null;
                    }

                    const passwordsMatch = await bcryptjs.compare(password, user.password)
                    if (passwordsMatch) return user;
                }

                return null;
            }
        }),
    ]
}