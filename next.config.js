/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['gateway.pinata.cloud'],
  },
};

module.exports = nextConfig;
