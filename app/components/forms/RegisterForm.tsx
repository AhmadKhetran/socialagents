'use client';

import axios from 'axios';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'react-toastify';

const RegisterForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');

    const handleRegister = async () => {
        try {
            setLoading(true);
            const resp = await axios.post('/api/register', { email, password });
            if (resp.data.success) {
                const signin = await signIn('credentials', {
                    redirect: false,
                    email,
                    password,
                    callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}`,
                });
                console.log(signin);
                if (signin?.ok) {
                    toast.success(resp.data.message);
                    router.push('/');
                }
            } else {
                toast.error(resp.data.message);
            }
        } catch (e: any) {
            toast.error(
                e?.response?.data?.message ?? 'Unexpected error occured'
            );
        }

        setLoading(false);
    };

    return (
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign up to continue
            </h1>
            <form className="space-y-4 md:space-y-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John Doe"
                        required={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div></div>
                    <Link
                        href="/forgot-password"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Forgot password?
                    </Link>
                </div>
                <div className="flex items-center justify-center mt-4">
                    <div className="flex space-x-4">
                        <FaGithub
                            className="w-6 h-6 text-black-700 cursor-pointer"
                            onClick={() =>
                                signIn('github', {
                                    callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}`,
                                })
                            }
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleRegister}
                    disabled={loading}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    {loading ? 'Please wait...' : 'Sign Up'}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link
                        href="/login"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Sign In
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
