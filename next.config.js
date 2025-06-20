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

module.exports = nextConfig; 