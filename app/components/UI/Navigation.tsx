import { authOptions } from '@/app/utils/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import LogoutButton from './LogoutButton';

const Navigation = async () => {
    const session = await getServerSession(authOptions);

    return (
        <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold text-lg">Social Agents</span>
            </Link>

            {session && (
                <div className="flex items-center space-x-4">
                    <LogoutButton />
                </div>
            )}
        </nav>
    );
};

export default Navigation;
