import axios from 'axios';
import { NextResponse } from 'next/server';
import qs from 'querystring';

export async function POST(req: Request) {
    const { subreddit, title, text, userAccessToken } = await req.json();
    try {
        const postData = qs.stringify({
            sr: subreddit,
            kind: 'self',
            title: title,
            text: text,
            api_type: 'json', // Reddit API requires this parameter
        });

        const response = await axios.post(
            'https://oauth.reddit.com/api/submit',
            postData,
            {
                headers: {
                    Authorization: `Bearer ${userAccessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'socialAgents/1.0 (https://audit.paal.ai)',
                },
            }
        );

        return NextResponse.json(
            {
                message: 'Posted on reddit',
                success: true,
                data: response.data.data,
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: 'error while posting', success: false },
            { status: 400 }
        );
    }
}
