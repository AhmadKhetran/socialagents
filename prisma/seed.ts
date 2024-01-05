const { PrismaClient } = require('@prisma/client');

async function seed() {
    const prisma = new PrismaClient();

    try {
        await prisma.product.deleteMany({});

        const product1 = await prisma.product.create({
            data: {
                name: 'Ride 2 running shows',
                image: 'https://onepoint.pk/cdn/shop/products/nike-renew-ride-2-men-shoes-price-pakistan.jpg',
                slug: 'product-21',
                price: 29.99,
                description: 'Description for Product 1',
                tags: 'tag1, tag2',
            },
        });

        const product2 = await prisma.product.create({
            data: {
                name: 'Nike AirMax 2018',
                image: 'https://onepoint.pk/cdn/shop/products/nike-renew-ride-2-men-shoes-price-pakistan.jpg',
                slug: 'product-22',
                price: 39.99,
                description: 'Description for Product 2',
                tags: 'tag2, tag3',
            },
        });

        console.log('Seed data created:', { product1, product2 });
    } catch (error) {
        throw error;
    } finally {
        await prisma.$disconnect();
        console.log('Data seeded successfully');
    }
}

seed().catch((error) => {
    console.error('Error seeding data:', error);
});
