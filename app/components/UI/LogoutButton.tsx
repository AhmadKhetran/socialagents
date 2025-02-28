'use client';

import axios from 'axios';
import { signOut } from 'next-auth/react';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

const LogoutButton = (user: any) => {
    return (
        <button
            onClick={async () => {
                const userId = user.user.id;
                await axios.post('/api/delete_user', {
                    userId,
                });
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
