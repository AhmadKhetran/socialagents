import { getAllProducts } from '@/app/lib/products/index';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Navigation from './components/UI/Navigation';
import ProductCard from './components/product/ProductCard';
import ProductForm from './components/product/ProductForm';
import { authOptions } from './utils/auth';
export default async function Home() {
    const session = await getServerSession(authOptions);

    const products = await getAllProducts(false);
    console.log(products);

    return (
        <>
            <Navigation />

            <section className="bg-gray-50 dark:bg-gray-900 p-8 text-white text-center flex-col items-center justify-center w-full">
                <h1 className="text-4xl font-bold mb-4">Welcome</h1>

                {session ? (
                    <>
                        <ProductForm isEditing={false} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-10">
                            {products.map((product, i) => (
                                <ProductCard
                                    key={i}
                                    name={product.name}
                                    image={product.image}
                                    slug={product.slug}
                                    price={product.price}
                                    description={product.description}
                                    tags={product.tags?.split(',') ?? []}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <Link
                        className="text-blue-500 hover:underline"
                        href="/login"
                    >
                        Click here to login
                    </Link>
                )}
            </section>
        </>
    );
}
