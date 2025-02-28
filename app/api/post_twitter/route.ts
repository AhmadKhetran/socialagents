import crypto from 'crypto';
import { NextResponse } from 'next/server';
import OAuth from 'oauth-1.0a';

export async function POST(req: Request) {
    const { text } = await req.json();

    // Get from environment variables
    const CONSUMER_KEY = 'dpeMxCZiMxoJZPcfGrJkIe0Rw';
    const CONSUMER_SECRET =
        'qpQDsh-0mi09wUGQcCpf_7-PZQ6Q0-s6HmekXesADpca1RUe4p';
    const ACCESS_TOKEN = '2310162017-F5xhAaLKPMrvRKjvd1hSzyWdXPIQnNri1uxaP0d';
    const ACCESS_TOKEN_SECRET = 'ifoGu3yxBL97Nwm04tnT5dOWxHufbkf4XhwZD91yEHLsC';

    try {
        // Initialize OAuth client
        const oauth = new OAuth({
            consumer: { key: CONSUMER_KEY, secret: CONSUMER_SECRET },
            signature_method: 'HMAC-SHA1',
            hash_function: (baseString, key) => {
                return crypto
                    .createHmac('sha1', key)
                    .update(baseString)
                    .digest('base64');
            },
        });

        // If media is provided, upload first

        // Create tweet payload
        const tweetEndpoint = 'https://api.twitter.com/2/tweets';
        const tweetPayload = {
            text: text,
        };

        // Generate authorization header
        const authHeader = oauth.toHeader(
            oauth.authorize(
                {
                    url: tweetEndpoint,
                    method: 'POST',
                },
                {
                    key: ACCESS_TOKEN,
                    secret: ACCESS_TOKEN_SECRET,
                }
            )
        );

        // Send tweet
        const response = await fetch(tweetEndpoint, {
            method: 'POST',
            headers: {
                ...authHeader,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tweetPayload),
        });

        const data = await response.json();

        return NextResponse.json(
            { success: true, tweetId: data.data.id },
            { status: 200 }
        );
    } catch (error) {
        console.error('Twitter API Error:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
