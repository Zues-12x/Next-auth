import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs";

import { LoginSchema } from "./schemas"
import { getUserbyEmail } from "./data/user";

export default {
    providers: [Credentials({
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
    })]
}