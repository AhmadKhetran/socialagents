import prisma from '@/app/utils/prisma';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data = await req.json();
    const { email, password } = data;

    const existingUser = await prisma.user.findUnique({
        where: {
            email: email.toLowerCase(),
        },
    });

    if (existingUser) {
        return NextResponse.json(
            {
                message: 'Email already exists',
            },
            {
                status: 500,
            }
        );
    }

    const hashedPassword = await hash(password, 10);

    try {
        await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Registration successfull!',
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        return NextResponse.json({ error: 'Error creating user' });
    }
}
