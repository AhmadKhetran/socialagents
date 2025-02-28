import prisma from '@/app/utils/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data = await req.json();
    const { userId } = data;
    console.log(userId);
    try {
        const existingUser = await prisma.account.delete({
            where: {
                id: userId,
            },
            include: {
                user: true,
            },
        });

        await prisma.user.delete({
            where: {
                id: existingUser.userId,
            },
        });

        return NextResponse.json(
            {
                message: 'del',
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                message: 'unable to del',
            },
            {
                status: 500,
            }
        );
    }
}
