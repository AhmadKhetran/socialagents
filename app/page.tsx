import { getServerSession } from 'next-auth';
import Link from 'next/link';
import Navigation from './components/UI/Navigation';
import { authOptions } from './utils/auth';
export default async function Home() {
    const session = await getServerSession(authOptions);

    const provider = session?.user.provider;
    console.log(session);
    return (
        <>
            <Navigation />

            <section className="bg-gray-50 dark:bg-gray-900 p-8 text-white text-center flex-col items-center justify-center w-full">
                <h1 className="text-4xl font-bold mb-4">
                    Welcome {session?.user.name}
                </h1>

                {session ? (
                    <>
                        {provider === 'reddit' ? (
                            <div className="p-4 border border-gray-300 rounded-lg bg-gray-100 my-4">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Reddit Access Token
                                </h3>
                                <p className="text-sm text-gray-700">
                                    <strong>Access Token:</strong>{' '}
                                    {session.user.accessToken}
                                </p>
                            </div>
                        ) : provider === 'linkedin' ? (
                            <div className="p-4 border border-blue-500 rounded-lg bg-blue-100 my-4">
                                <h3 className="text-xl font-semibold text-blue-800">
                                    LinkedIn Access Token & Author Id
                                </h3>
                                <p className="text-sm text-gray-700">
                                    <strong>Access Token:</strong>{' '}
                                    {session.user.accessToken}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Author:</strong>{' '}
                                    {session.user.accountId}
                                </p>
                            </div>
                        ) : provider === 'pinterest' ? (
                            <div className="p-4 border border-red-600 rounded-lg bg-red-100 my-4">
                                <h3 className="text-xl font-semibold text-red-800">
                                    Pinterest Access Token
                                </h3>
                                <p className="text-sm text-gray-700">
                                    <strong>Access Token:</strong>{' '}
                                    {session.user.accessToken}
                                </p>
                            </div>
                        ) : (
                            <></>
                        )}
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
