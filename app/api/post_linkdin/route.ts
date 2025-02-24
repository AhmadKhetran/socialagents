import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { author, commentary, userAccessToken } = await req.json();
    try {
        const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${userAccessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0',
            },
            body: JSON.stringify({
                author: `urn:li:person:${author}`,
                lifecycleState: 'PUBLISHED',
                specificContent: {
                    'com.linkedin.ugc.ShareContent': {
                        shareCommentary: {
                            text: commentary,
                        },
                        shareMediaCategory: 'NONE',
                    },
                },
                visibility: {
                    'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
                },
            }),
        });

        return NextResponse.json(
            { message: 'posting done', data: response, success: true },
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
