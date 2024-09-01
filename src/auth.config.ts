import type { DefaultSession, NextAuthConfig, User as UserTypes } from 'next-auth';
import dbConnect from './app/utils/dbConn';
import User from './app/modals/user';
import { resolve } from 'path/posix';
interface CustomUser extends UserTypes {
    token?: string;
    role?: string;
    refresh_token?: string
    expires_at: string
}

declare module "next-auth" {
    interface Session {
        user: {
            token: string,
            name: string,
            email: string,
            role: string,
            id: string,
            refreshToken: string;
            createdAt: string;
            error: string;
        } & DefaultSession["user"]
    }
}

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnCart = nextUrl.pathname.startsWith('/cart');
            if (isOnDashboard || isOnCart) {
                if (isLoggedIn) {
                    if (isOnDashboard && auth.user.role === "admin")
                        return true;
                    return true
                }
                return false;
            }
            return true;
        },
        async jwt({ token, user }) {
            const customUser = user as CustomUser

            if (customUser) {
                token.id = customUser.id;
                token.email = customUser.email;
                token.name = customUser.name;
                token.refresh_token = customUser.refresh_token
                token.expires_at = customUser.expires_at
                token.token = customUser.token;
                token.role = customUser.role

            } else if ((token.expires_at as number) > Date.now() / 1000) {
                return token
            } else {
                if (!token.refresh_token) {
                    throw new Error("Mising Refresh Token")
                }

                try {
                    let res;
                    res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/createRefreshToken`, {
                        method: "POST",
                        body: JSON.stringify({
                            refreshToken: token.refresh_token
                        })
                    });

                    if (!res.ok) {
                        throw res
                    }
                    const data = await res.json();
                    token.token = data.access_token
                    token.expires_at = Math.floor(
                        Date.now() / 1000 + data.expires_in
                    )
                    if (data.refresh_token)
                        token.refresh_token = data.refresh_token

                } catch (error) {
                    console.log("Error", error)
                    token.error = "refreshTokenError"
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.error = token.error as string
            }
            session.user.token = token.token as string;
            return session;
        },
        async redirect() {
            return "/";
        },


    },
    providers: [],
} satisfies NextAuthConfig;