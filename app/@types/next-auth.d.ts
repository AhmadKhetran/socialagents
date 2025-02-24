import 'next-auth';

export declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            email: string;
            accountType: string;
            oauth_token_secret?: string;
            oauth_token?: string;
            name: string;
            provider: string;
            accessToken: string;
            accountId: string;
        };
    }
}
