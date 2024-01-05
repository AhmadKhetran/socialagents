import prisma from '@/app/utils/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'john@abc.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any) {
                const { email, password } = credentials;

                const user = await prisma.user.findUnique({
                    where: {
                        email: email.toLowerCase(),
                    },
                });

                if (!user) {
                    return null; // User not found
                }

                if (!user.password) {
                    //Social login was used
                    return null;
                }
                const passwordMatch = await compare(password, user.password);

                if (!passwordMatch) {
                    return null; // Incorrect password
                }

                return user;
            },
        }),
    ],
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET as string,
    session: {
        strategy: 'jwt',
    },
} satisfies NextAuthOptions;
