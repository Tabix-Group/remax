/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'via.placeholder.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL 
      || (process.env.NODE_ENV === 'production'
          ? 'https://remax-be-production.up.railway.app/api'
          : 'http://localhost:3001/api'
        ),
  },
  async rewrites() {
    return [
      {
        source: '/api/roles',
        destination: process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')}/roles`
          : (process.env.NODE_ENV === 'production'
              ? 'https://remax-be-production.up.railway.app/api/roles'
              : 'http://localhost:3001/api/roles'),
      },
      {
        source: '/api/permissions',
        destination: process.env.NEXT_PUBLIC_API_URL
          ? `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')}/permissions`
          : (process.env.NODE_ENV === 'production'
              ? 'https://remax-be-production.up.railway.app/api/permissions'
              : 'http://localhost:3001/api/permissions'),
      },
    ];
  },
}

module.exports = nextConfig
