import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formats modernes pour une meilleure compression
    formats: ['image/avif', 'image/webp'],
    // Tailles d'appareils pour responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'gaymkbmtppvkyzmkplzu.supabase.co',
      },
    ],
  },
  // Compression et optimisation
  compress: true,
  // Optimisation des paquets
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
