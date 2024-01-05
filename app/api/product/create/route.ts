import prisma from '@/app/utils/prisma';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const data = await req.json();
    const { name, image, slug, price, description, tags } = data;

    try {
        await prisma.product.create({
            data: {
                name,
                image,
                slug,
                price: Number(price) ?? 0,
                description,
                tags,
            },
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Product added successfully',
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: 'Error creating product' },
            { status: 500 }
        );
    }
}
