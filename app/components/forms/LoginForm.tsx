'use client';

import { signIn } from 'next-auth/react';
import { FaLinkedin, FaRadiation, FaTwitter } from 'react-icons/fa';

const LoginForm = () => {
    return (
        <form className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-center mt-4">
                {/* <div className="flex space-x-4">
                    <FaTwitter
                        className="w-6 h-6 text-black-700 cursor-pointer"
                        onClick={() =>
                            signIn('twitter', {
                                callbackUrl: `http://localhost:3000`,
                            })
                        }
                    />
                </div> */}
                <div className="flex space-x-4 gap-2">
                    <FaRadiation
                        className="w-6 h-6 text-black-700 cursor-pointer"
                        onClick={() =>
                            signIn('reddit', {
                                callbackUrl: `http://44.216.8.86:3001`,
                            })
                        }
                    />{' '}
                    Get Reddit AccessToken
                </div>
                <div className="flex space-x-4 gap-2">
                    <FaLinkedin
                        className="w-6 h-6 text-black-700 cursor-pointer"
                        onClick={() =>
                            signIn('linkedin', {
                                callbackUrl: `http://44.216.8.86:3001`,
                            })
                        }
                    />{' '}
                    Get Linkedin AccessToken
                </div>
                <div className="flex space-x-4 gap-2">
                    <FaTwitter
                        className="w-6 h-6 text-black-700 cursor-pointer"
                        onClick={() =>
                            signIn('twitter', {
                                callbackUrl: `http://44.216.8.86:3001`,
                            })
                        }
                    />{' '}
                    Get Twitter AccessToken
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
