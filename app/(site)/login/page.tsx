import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Navigation from '../../components/UI/Navigation';
import LoginForm from '../../components/forms/LoginForm';
import { authOptions } from '../../utils/auth';

const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) return redirect(`${process.env.APP_URL}`);

  return (
    <>
      <Navigation />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            href="/login"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Image
              width={0}
              height={0}
              className="w-8 h-8 mr-2"
              src="/logo.png"
              alt="logo"
            />
            Login
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
