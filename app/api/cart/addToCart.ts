import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { product_id } = req.body;
        console.log(product_id);
        return res
            .status(201)
            .json({ product_ids: [1, 2, 3], quantity: [1, 1, 3] });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
