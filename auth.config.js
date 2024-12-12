import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import bcryptjs from "bcryptjs";
import axios from "axios";

import { LoginSchema } from "./schemas"
import { getUserbyEmail } from "./data/user";


export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            async profile(profile, tokens) {
                try {

                    const { data: emails } = await axios.get("https://api.github.com/user/public_emails", {
                        headers: {
                            Accept: "application/vnd.github+json",
                            Authorization: `token ${tokens.access_token}`,
                        },
                    });
                    const primaryEmail = emails.find(email => email.primary && email.verified)?.email || null;


                    return {
                        id: String(profile.id),
                        name: profile.name || profile.login,
                        email: primaryEmail,
                        image: profile.avatar_url,
                    };
                } catch (error) {
                    console.error("Error fetching GitHub emails:", error);
                    throw new Error("Failed to fetch email from GitHub");
                }
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