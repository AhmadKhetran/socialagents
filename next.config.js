/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'onepoint.pk',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
