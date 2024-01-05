import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import TanstackProvider from './providers/TanstackProvider';

type LayoutProps = {
    children: React.ReactNode;
    types: string;
};

export const metadata: Metadata = {
    title: 'Next JS Starter',
    description: 'Next JS starter template for TensorLabs',
};

export default async function RootLayout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body>
                <TanstackProvider>{children}</TanstackProvider>
                <ToastContainer />
            </body>
        </html>
    );
}
