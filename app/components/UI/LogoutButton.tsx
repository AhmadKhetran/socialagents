'use client';

import React from 'react';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';

const LogoutButton = () => {
  return (
    <button
      onClick={async () => {
        await signOut({
          callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
        });
        toast.success('Signed out successfully');
      }}
      className="flex items-center"
    >
      <RiLogoutCircleLine className="h-6 w-6" />
      <span className="ml-2">Logout</span>
    </button>
  );
};

export default LogoutButton;
