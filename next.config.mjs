import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {

  env: {
    BASE_TOKEN: process.env.BASE_TOKEN,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Match all API routes
        destination: 'https://joinium.tgfen.com/api/:path*',
      }
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'webkade.storage.iran.liara.space',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
