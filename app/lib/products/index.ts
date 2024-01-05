import prisma from '@/app/utils/prisma';
import { Product } from '@prisma/client';

const getAllProducts = async (sort?: boolean): Promise<Product[]> => {
    let products: Product[];

    if (sort) {
        products = await prisma.product.findMany({
            orderBy: {
                created_at: 'desc',
            },
        });
    } else {
        products = await prisma.product.findMany();
    }

    return products;
};

export { getAllProducts };
