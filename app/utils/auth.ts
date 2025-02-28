import prisma from '@/app/utils/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import LinkedIn from 'next-auth/providers/linkedin';
import Reddit from 'next-auth/providers/reddit';
import Twitter from 'next-auth/providers/twitter';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),

        Twitter({
            clientId: process.env.C_TWITTER_API_KEY as string,
            clientSecret: process.env.C_TWITTER_API_SECRET as string,
        }),

        Reddit({
            clientId: process.env.REDDIT_CLIENT_ID as string,
            clientSecret: process.env.REDDIT_SECRET as string,
            authorization: {
                params: {
                    scope: 'identity read submit',
                },
            },
        }),

        LinkedIn({
            clientId: process.env.LINKEDIN_CLIENT_ID as string,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
            authorization: {
                params: { scope: 'openid profile email w_member_social' },
            },
            profile: (profile: any) => ({
                id: profile.sub,
                name: profile.name,
                email: profile.email,
                image: profile.picture,
            }),
            issuer: 'https://www.linkedin.com',
            wellKnown:
                'https://www.linkedin.com/oauth/.well-known/openid-configuration',
        }),
    ],
    pages: {
        signIn: '/auth/login',
        error: '/auth/login',
        signOut: '/auth/login',
        verifyRequest: '/auth/login',
    },
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET as string,
    session: {
        strategy: 'jwt',
    },

    callbacks: {
        jwt({ token, account, user }) {
            console.log(token, account, user);
            if (account) {
                token.accessToken = account.access_token;
                token.id = user?.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id) {
                const user = await prisma.account.findFirst({
                    where: {
                        userId: token.id,
                    },
                });
                console.log(token);
                if (session && user && session.user) {
                    // Check if session and session.user are defined
                    session.user.id = user.id;
                    session.user.oauth_token_secret =
                        user.oauth_token_secret || '';
                    session.user.oauth_token = user.oauth_token || '';
                    session.user.provider = user.provider;
                    session.user.accessToken = user.access_token || '';
                    session.user.accountId = user.providerAccountId;
                }

                console.log(session, token);
                return session;
            }

            return session;
        },
    },
} satisfies NextAuthOptions;
