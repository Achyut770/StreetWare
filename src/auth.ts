import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { zod_password } from './app/lib/types';
import { getTokensAndUser } from './app/lib/userAuth';
import { authConfig } from './auth.config';

export const authOptions = {
    ...authConfig,
    providers: [

        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: zod_password })
                    .safeParse(credentials);
                if (!parsedCredentials.success) {
                    return null;
                }
                const { email, password } = parsedCredentials.data;
                const data = await getTokensAndUser(email);
                if (!data) return null;
                if (!data.user.password) return null;
                const passwordsMatch = await bcrypt.compare(password, data.user.password);
                if (passwordsMatch) {
                    return {
                        name: data.user.name,
                        id: data.user.id,
                        email: data.user.email,
                        token: data.accessToken,
                        role: data.user.role,
                        refresh_token: data.refreshToken,
                        expires_at: data.expires_at
                    };
                }
                return null;
            }
        }),



    ],

};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authOptions);
