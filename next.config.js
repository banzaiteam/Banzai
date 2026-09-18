/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://gate.yogram.ru/api/v1/:path*',
      },
    ];
  },
};

const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

module.exports = withNextIntl({
  ...nextConfig,
  images:{
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yogram-files.s3.eu-north-1.amazonaws.com',
        pathname: '/posts/**',
      },
    ],
  },

});