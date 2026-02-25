/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    images: {
      unoptimized: true, // Disables next/image optimization for static export
    },
  };

export default nextConfig;
