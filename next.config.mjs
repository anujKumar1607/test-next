/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Completely disable ESLint during builds
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

export default nextConfig;
