import RegisterForm from '@/app/components/forms/RegisterForm';
import { authOptions } from '@/app/utils/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const RegisterPage = async () => {
    const session = await getServerSession(authOptions);

    if (session) return redirect(`${process.env.APP_URL}`);

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <Link
                    href="/register"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <Image
                        width={0}
                        height={0}
                        className="w-8 h-8 mr-2"
                        src="/logo.png"
                        alt="logo"
                    />
                    Register
                </Link>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <RegisterForm />
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;
