'use client';

import { ProductFormType } from '@/app/@types/Forms';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ProductForm = ({ isEditing }: { isEditing: boolean }) => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm<ProductFormType>();

    const { mutate: createProduct, isPending } = useMutation({
        mutationFn: (newProduct: ProductFormType) => {
            return axios.post('/api/product/create', newProduct);
        },
        onError: (error: any) => {
            toast.error(
                error?.response?.data?.message ?? 'Unexepected error occured'
            );
        },
        onSuccess: () => {
            toast.success('Product added successfully');
            router.refresh();
        },
    });

    const onSubmit: SubmitHandler<ProductFormType> = (data) => {
        createProduct(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-1/2 space-y-4 md:space-y-6 mt-10"
        >
            <h3>Add New Product</h3>
            <div>
                <input
                    {...register('name', { required: true })}
                    type="text"
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Product Name"
                />
            </div>

            <div>
                <input
                    {...register('image', { required: true })}
                    type="text"
                    name="image"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Product Image"
                />
            </div>

            <div>
                <input
                    {...register('slug', { required: true })}
                    type="text"
                    name="slug"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Product Slug"
                />
            </div>

            <div>
                <input
                    {...register('price', { required: true })}
                    type="number"
                    name="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Product Price"
                />
            </div>

            <div>
                <input
                    {...register('description', { required: true })}
                    type="text"
                    name="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Product description"
                />
            </div>

            <div>
                <input
                    {...register('tags', { required: true })}
                    type="text"
                    name="tags"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Product tags"
                />
            </div>

            <button type="submit" className="btn btn-primary w-full max-w-lg">
                {isPending ? 'Please wait...' : isEditing ? 'Update' : 'Create'}
            </button>
        </form>
    );
};

export default ProductForm;
