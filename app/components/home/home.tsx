'use client';
import Link from 'next/link';
import { useState } from 'react';

const HomeClientComp = ({ session }: { session: any }) => {
    const [copied, setCopied] = useState(false);
    const [copied2, setCopied2] = useState(false);

    const provider = session?.user.provider;
    const handleCopy = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch((err) => {
                console.error('Error copying text: ', err);
            });
    };

    const handleCopy2 = (text: string) => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopied2(true);
                setTimeout(() => setCopied2(false), 2000);
            })
            .catch((err) => {
                console.error('Error copying text: ', err);
            });
    };
    return (
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
                            <div className="flex items-center space-x-2">
                                <p className="text-sm text-gray-700 truncate max-w-full break-words">
                                    <strong>Access Token:</strong>{' '}
                                    {session.user.accessToken}
                                </p>
                                <button
                                    onClick={() =>
                                        handleCopy(session.user.accessToken)
                                    }
                                    className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    ) : provider === 'linkedin' ? (
                        <div className="p-4 border border-gray-300 rounded-lg bg-gray-100 my-4">
                            <h3 className="text-xl font-semibold text-blue-800">
                                LinkedIn Access Token & Author Id
                            </h3>
                            <div className="flex items-center space-x-2">
                                <p className="text-sm text-gray-700 truncate max-w-full break-words">
                                    <strong>Access Token:</strong>{' '}
                                    {session.user.accessToken}
                                </p>
                                <button
                                    onClick={() =>
                                        handleCopy(session.user.accessToken)
                                    }
                                    className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                >
                                    {copied ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <p className="text-sm text-gray-700 truncate max-w-full break-words">
                                    <strong>Author:</strong>{' '}
                                    {session.user.accountId}
                                </p>
                                <button
                                    onClick={() =>
                                        handleCopy2(session.user.accountId)
                                    }
                                    className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                >
                                    {copied2 ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                        </div>
                    ) : provider === 'twitter' ? (
                        <>
                            <div className="p-4 border border-blue-500 rounded-lg bg-blue-100 my-4">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Twitter Oauth Token & oAuth Token Secret
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <p className="text-sm text-gray-700 truncate max-w-full break-words">
                                        <strong>Oauth Token:</strong>{' '}
                                        {session.user.oauth_token}
                                    </p>
                                    <button
                                        onClick={() =>
                                            handleCopy(session.user.oauth_token)
                                        }
                                        className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                    >
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                                <div className="flex items-center space-x-2 mt-4">
                                    <p className="text-sm text-gray-700 truncate max-w-full break-words">
                                        <strong>Oauth Secret:</strong>{' '}
                                        {session.user.oauth_token_secret}
                                    </p>
                                    <button
                                        onClick={() =>
                                            handleCopy2(
                                                session.user.oauth_token_secret
                                            )
                                        }
                                        className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                    >
                                        {copied2 ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <Link className="text-blue-500 hover:underline" href="/login">
                    Click here to login
                </Link>
            )}
        </section>
    );
};

export default HomeClientComp;
