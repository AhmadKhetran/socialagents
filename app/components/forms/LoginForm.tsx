'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'react-toastify';

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const handleLogin = async () => {
        try {
            const resp = await signIn('credentials', {
                redirect: false,
                email,
                password,
                callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}`,
            });

            if (resp?.ok) {
                toast.success('Logged in successfully');
                router.push('/');
            } else {
                toast.error('Oops! Incorrect Credentials.');
            }
        } catch (e) {
            toast.error('Oops! Incorrect Credentials.');
        }
    };

    return (
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
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            required={false}
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label className="text-gray-500 dark:text-gray-300">
                            Remember me
                        </label>
                    </div>
                </div>
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
                onClick={handleLogin}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                Sign in
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account yet?{' '}
                <Link
                    href="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                    Sign up
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;
