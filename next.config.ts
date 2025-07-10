import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Базовая конфигурация Next.js
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: { properties: ['^cz-'] }, // Удаляет проблемные атрибуты
  },
}

export default nextConfig
