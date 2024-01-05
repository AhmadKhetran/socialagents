import React from 'react';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

const Navigation = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          width={0}
          height={0}
          src="/logo.png"
          alt="Logo"
          className="h-8 w-8"
        />
        <span className="font-bold text-lg">TensorLabs</span>
      </Link>

      {session && (
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 21a3 3 0 01-3-3h12a3 3 0 01-3 3H9zm-5-5v-9a1 1 0 011-1h16a1 1 0 011 1v9h2l-3.293-7.386A2 2 0 0018.88 5H5.12a2 2 0 00-1.827 2.614L2 16h2zm4-9h12v5H8V7zm4 3a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
            <span className="font-semibold">Cart</span>
          </div>

          <LogoutButton />
        </div>
      )}
    </nav>
  );
};

export default Navigation;
