import axios from 'axios';
import { NextResponse } from 'next/server';
import OAuth from 'oauth-1.0a';

const oauth = new OAuth({
    consumer: {
        key: process.env.C_TWITTER_API_KEY as string,
        secret: process.env.C_TWITTER_API_SECRET as string,
    },
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { oauth_token, oauth_token_secret, tweetBody } = body;

        const requestData = {
            url: 'https://api.twitter.com/1.1/statuses/update.json',
            method: 'POST',
            data: {
                status: tweetBody,
            },
        };

        const oauthHeader = oauth.toHeader(
            oauth.authorize(requestData, {
                key: oauth_token,
                secret: oauth_token_secret,
            })
        );

        const response = await axios.post(requestData.url, requestData.data, {
            headers: {
                ...oauthHeader,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log('Tweet successfully posted:', response.data);

        return NextResponse.json(
            { message: 'Post Tweeted', success: true },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: 'error while tweeting', success: false },
            { status: 400 }
        );
    }
}
